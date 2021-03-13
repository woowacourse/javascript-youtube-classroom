import { getListByKey, insertItemByKey, setListByKey } from '../utils/localStorage.js';
import { MAX_RECENT_KEYWORD_COUNT, DB_KEY } from '../constants.js';

/*
로컬스토리지 데이터 저장구조
  {
    videos: [ { videoId: 'TVUNi0zi1yw', ..., isWatching: true }, ... ],
    recentKeywords: [ 'keyword1', 'keyword2', 'keyword3' ],
  }
*/

export default class SearchModel {
  constructor(keyword = '') {
    this.init(keyword);
    this.recentKeywords = getListByKey(DB_KEY.RECENT_KEYWORDS);
  }

  init(keyword) {
    this.nextPageToken = '';
    this.totalSearchResult = [];
    this.keyword = keyword;
    this.saveKeyword();
  }

  setNextPageToken(token) {
    this.nextPageToken = token;
  }

  saveKeyword() {
    if (this.keyword === '') {
      return;
    }

    if (this.recentKeywords.includes(this.keyword)) {
      return;
    }
    if (this.recentKeywords.length === MAX_RECENT_KEYWORD_COUNT) {
      this.recentKeywords.pop();
    }
    this.recentKeywords.unshift(this.keyword);
    setListByKey(DB_KEY.RECENT_KEYWORDS, this.recentKeywords);
  }

  getRecentKeywords() {
    try {
      return getListByKey(DB_KEY.RECENT_KEYWORDS);
    } catch (e) {
      return '';
    }
  }

  removeRecentKeyword(target) {
    this.recentKeywords = this.recentKeywords.filter((keyword) => keyword !== target);
    setListByKey(DB_KEY.RECENT_KEYWORDS, this.recentKeywords);
  }

  addNewSearchResult(newSearchResult) {
    this.totalSearchResult.push(...newSearchResult);
  }

  getTargetVideoData(targetId) {
    return this.totalSearchResult.find((video) => video.videoId === targetId);
  }

  saveVideo(targetVideo) {
    targetVideo.isSaved = true;
    targetVideo.isWatching = true;
    insertItemByKey(DB_KEY.VIDEOS, targetVideo);
  }
}
