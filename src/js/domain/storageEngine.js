import { MAX_SAVED_VIDEOS_LENGTH, MESSAGE, MESSAGE_TYPE, TAB_MENU } from '../util/constants.js';

export default class StorageEngine {
  constructor() {
    localStorage.setItem('currentTabMenu', TAB_MENU.WATCH_LATER);
  }

  setTabMenu(tabMenu) {
    localStorage.setItem('currentTabMenu', tabMenu);
  }

  getTabMenu() {
    return localStorage.getItem('currentTabMenu') ?? TAB_MENU.WATCH_LATER;
  }

  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos')) ?? [];
  }

  getWatchLaterVideos() {
    return this.getSavedVideos().filter((video) => video.isWatched === false);
  }

  getWatchedVideos() {
    return this.getSavedVideos().filter((video) => video.isWatched === true);
  }

  changeStatus(videoId, status) {
    const savedVideos = this.getSavedVideos();

    const target = savedVideos.find((video) => video.videoId === videoId);
    target[status] = !target[status];

    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }

  removeVideo(videoId) {
    const savedVideos = this.getSavedVideos();

    const target = savedVideos.findIndex((video) => video.videoId === videoId);
    savedVideos.splice(target, 1);

    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }

  isSavedVideo(videoId) {
    return this.getSavedVideos().some((video) => video.videoId === videoId);
  }

  saveVideo(data) {
    const savedVideos = this.getSavedVideos();

    if (this.isSavedVideo(data.videoId)) {
      const error = new Error(MESSAGE.ALREADY_STORED);
      error.name = MESSAGE_TYPE.ALREADY_STORED;
      throw error;
    }

    if (savedVideos.length >= MAX_SAVED_VIDEOS_LENGTH) {
      const error = new Error(MESSAGE.FULL_STORAGE);
      error.name = MESSAGE_TYPE.FULL_STORAGE;
      throw error;
    }

    savedVideos.push(data);
    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }
}
