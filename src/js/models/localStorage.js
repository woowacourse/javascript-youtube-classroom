import { MAX_RECENT_KEYWORD_COUNT, VIDEOS_TO_WATCH, VIDEOS_WATCHED } from '../constants.js';

/*
  로컬스토리지 데이터 저장구조
  {
    videosToWatch: [ { videoId: , ... } ... ],
    videosWatched: [ { videoId: , ... } ... ],
    recentKeywords: [ keyword1, keyword2, keyword3 ],
  {
*/

export default class VideoLocalStorage {
  getVideo(key) {
    return localStorage.getItem(key);
  }

  setVideo(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }

  getVideoList(key) {
    try {
      return JSON.parse(this.getVideo(key)) || [];
    } catch (e) {
      return [];
    }
  }

  addVideo(key, target) {
    const list = this.getVideoList(key);

    list.push(target);
    this.setVideo(key, list);
  }

  removeVideo(key, targetIdKey, targetIdValue) {
    const list = this.getVideoList(key);
    const target = list.find((video) => video[targetIdKey] === targetIdValue);
    const index = list.indexOf(target);

    this.setVideo(key, list.splice(index, 1));
    return target;
  }

  moveVideo(currKey, nextKey, targetIdKey, targetIdValue) {
    const target = this.removeVideo(currKey, targetIdKey, targetIdValue);

    this.addVideo(nextKey, target);
  }

  getStoredVideoCount() {
    return this.getVideoList(VIDEOS_TO_WATCH).length + this.getVideoList(VIDEOS_WATCHED);
  }

  addRecentKeyword(keyword) {
    const key = 'recentKeywords';
    const recentKeywords = this.getVideoList(key);

    recentKeywords.unshift(keyword);

    this.setItem(key, this.recentKeywords.slice(0, MAX_RECENT_KEYWORD_COUNT));
  }

  isStoredVideo(id) {
    return this.getVideoList(VIDEOS_TO_WATCH).some((video) => video.videoId === id);
  }
}
