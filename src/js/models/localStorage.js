import { MAX_RECENT_KEYWORD_COUNT, VIDEOS_TO_WATCH, VIDEOS_WATCHED, RECENT_KEYWORDS } from '../constants.js';

/*
  로컬스토리지 데이터 저장구조
  {
    videosToWatch: [ { videoId: , ... } ... ],
    videosWatched: [ { videoId: , ... } ... ],
    recentKeywords: [ keyword1, keyword2, keyword3 ],
  {
*/

export default class VideoLocalStorage {
  getItem(key) {
    return localStorage.getItem(key);
  }

  setItem(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }

  getList(key) {
    try {
      return JSON.parse(this.getItem(key)) || [];
    } catch (e) {
      return [];
    }
  }

  addVideo(key, target) {
    const list = this.getList(key);

    list.push(target);
    this.setItem(key, list);
  }

  removeVideo(key, targetIdKey, targetIdValue) {
    const list = this.getList(key);
    const target = list.find((video) => video[targetIdKey] === targetIdValue);
    const index = list.indexOf(target);

    this.setItem(key, list.splice(index, 1));
    return target;
  }

  moveVideo(currKey, nextKey, targetIdKey, targetIdValue) {
    const target = this.removeVideo(currKey, targetIdKey, targetIdValue);

    this.addVideo(nextKey, target);
  }

  getStoredVideoCount() {
    return this.getList(VIDEOS_TO_WATCH).length + this.getList(VIDEOS_WATCHED);
  }

  isStoredVideo(id) {
    return this.getList(VIDEOS_TO_WATCH).some((video) => video.videoId === id);
  }

  addRecentKeyword(keyword) {
    const recentKeywords = this.getList(RECENT_KEYWORDS);

    recentKeywords.unshift(keyword);
    this.setItem(RECENT_KEYWORDS, recentKeywords.slice(0, MAX_RECENT_KEYWORD_COUNT));
  }

  getMostRecentKeyword() {
    try {
      return this.getList(RECENT_KEYWORDS)[0];
    } catch (e) {
      return '';
    }
  }
}
