import {
  MAX_RECENT_KEYWORD_COUNT,
  KEY_VIDEOS_WATCHING,
  KEY_VIDEOS_WATCHED,
  KEY_RECENT_KEYWORDS,
} from '../constants.js';

import { getListByKey, insertItemByKey, insertItemAtFirstByKey, deleteLastItemByKey } from '../utils/localStorage.js';

/*
로컬스토리지 데이터 저장구조
  {
    videosWatching: [ { videoId: 'TVUNi0zi1yw', ... }, ... ],
    videosWatched: [ { videoId: '0nxsS4B85E8', ... }, ... ],
    recentKeywords: [ 'keyword1', 'keyword2', 'keyword3' ],
  }
*/

export default class SearchModel {
  constructor(keyword = '') {
    this.init(keyword);
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

    const recentKeywords = getListByKey(KEY_RECENT_KEYWORDS);

    if (recentKeywords.includes(this.keyword)) {
      return;
    }
    if (recentKeywords.length === MAX_RECENT_KEYWORD_COUNT) {
      deleteLastItemByKey(KEY_RECENT_KEYWORDS);
    }
    insertItemAtFirstByKey(KEY_RECENT_KEYWORDS, this.keyword);
  }

  getRecentKeywords() {
    try {
      return getListByKey(KEY_RECENT_KEYWORDS);
    } catch (e) {
      return '';
    }
  }

  addNewSearchResult(newSearchResult) {
    this.totalSearchResult.push(...newSearchResult);
  }

  getTargetVideoData(targetId) {
    return this.totalSearchResult.find((video) => video.videoId === targetId);
  }

  saveVideo(targetVideo) {
    targetVideo.isSaved = true;
    insertItemByKey(KEY_VIDEOS_WATCHING, targetVideo);
  }

  getSavedVideoCount() {
    return getListByKey(KEY_VIDEOS_WATCHING).length + getListByKey(KEY_VIDEOS_WATCHED).length;
  }
}
