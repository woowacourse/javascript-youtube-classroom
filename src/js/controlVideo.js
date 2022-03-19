import { REDIRECT_SERVER_HOST, VIDEO_ID_LIST_KEY, WATCHED_ID_LIST_KEY } from './constants/contants.js';
import mockDatas from './utils/mock.js';

class ControlVideo {
  constructor() {
    this.willWatchVideoIdList = this.getStorageWillWatchVideoList();
    this.watchedVideoIdList = this.getStorageWatchedVideoList();
  }

  setVideoIdListByDeleteButton(deleteVideoId, divisionSection) {
    if (divisionSection === 'will-watch') {
      this.willWatchVideoIdList =
        this.willWatchVideoIdList.filter((willWatchVideoId) => willWatchVideoId !== deleteVideoId);
    } else if (divisionSection === 'watched') {
      this.watchedVideoIdList =
        this.watchedVideoIdList.filter((watchedVideoId) => watchedVideoId !== deleteVideoId);
    }
  }

  setWillWatchVideoIdList() {
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.willWatchVideoIdList));
  }

  setWatchedVideoIdList() {
    localStorage.setItem(WATCHED_ID_LIST_KEY, JSON.stringify(this.watchedVideoIdList));
  }

  setVideoIdListByClickWatchedButton(videoId, divisionSection) {
    if (divisionSection === 'will-watch') {
      this.willWatchVideoIdList =
        this.willWatchVideoIdList.filter((willWatchVideoId) => willWatchVideoId !== videoId);
      this.watchedVideoIdList = [videoId, ...this.watchedVideoIdList];
    } else if (divisionSection === 'watched') {
      this.watchedVideoIdList =
        this.watchedVideoIdList.filter((watchedVideoId) => watchedVideoId !== videoId);
      this.willWatchVideoIdList = [videoId, ...this.willWatchVideoIdList];
    }
  }

  addStorageVideoList(videoId) {
    this.willWatchVideoIdList = [videoId, ...this.willWatchVideoIdList];
  }

  getStorageWillWatchVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }

  getStorageWatchedVideoList() {
    return JSON.parse(localStorage.getItem(WATCHED_ID_LIST_KEY)) || [];
  }
}

export default ControlVideo;
