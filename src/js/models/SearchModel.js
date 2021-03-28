import { getListFromDB, insertItemByKey, setListToDB } from '../utils/localStorage.js';
import { MAX_RECENT_KEYWORD_COUNT, DB_KEY } from '../constants.js';

/*
로컬스토리지 데이터 저장구조
  {
    videos: [ { videoId: 'TVUNi0zi1yw', ..., isWatched: false }, ... ],
    recentKeywords: [ 'keyword1', 'keyword2', 'keyword3' ],
  }
*/

export default class SearchModel {
  constructor() {
    this.initSearchResult();
    this.recentKeywords = getListFromDB(DB_KEY.RECENT_KEYWORDS);
  }

  initSearchResult() {
    this.nextPageToken = '';
    this.totalSearchResult = [];
  }

  setNextPageToken(token) {
    this.nextPageToken = token;
  }

  updateForNewSearch(keyword) {
    this.initSearchResult();
    this.setKeyword(keyword);
  }

  setKeyword(keyword) {
    this.keyword = keyword;
    if (this.recentKeywords.includes(this.keyword)) {
      return;
    }
    this.updateRecentKeywords();
  }

  updateRecentKeywords() {
    if (this.recentKeywords.length === MAX_RECENT_KEYWORD_COUNT) {
      this.recentKeywords.pop();
    }
    this.recentKeywords.unshift(this.keyword);
    setListToDB(DB_KEY.RECENT_KEYWORDS, this.recentKeywords);
  }

  getRecentKeywords() {
    try {
      return getListFromDB(DB_KEY.RECENT_KEYWORDS);
    } catch (e) {
      return '';
    }
  }

  removeRecentKeyword(target) {
    this.recentKeywords = this.recentKeywords.filter((keyword) => keyword !== target);
    setListToDB(DB_KEY.RECENT_KEYWORDS, this.recentKeywords);
  }

  addNewSearchResult(newSearchResult) {
    this.totalSearchResult.push(...newSearchResult);
  }

  getTargetVideoData(targetId) {
    return this.totalSearchResult.find((video) => video.videoId === targetId);
  }

  saveVideo(targetVideo) {
    targetVideo.isSaved = true;
    targetVideo.isWatched = false;
    targetVideo.isLiked = false;
    insertItemByKey(DB_KEY.VIDEOS, targetVideo);
  }
}
