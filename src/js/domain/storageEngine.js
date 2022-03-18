import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

export default class StorageEngine {
  constructor() {
    localStorage.setItem('currentTabMenu', 'watch-later');
  }

  setTabMenu(tabMenu) {
    localStorage.setItem('currentTabMenu', tabMenu);
  }

  getTabMenu() {
    return localStorage.getItem('currentTabMenu') ?? 'watch-later';
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

  isSavedVideo(videoId) {
    return this.getSavedVideos()
      .map(({ videoId }) => videoId)
      .includes(videoId);
  }

  saveVideo(data) {
    const savedVideos = this.getSavedVideos();

    if (this.isSavedVideo(data.videoId) && savedVideos.length >= MAX_SAVED_VIDEOS_LENGTH) return;

    savedVideos.push(data);
    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }
}
