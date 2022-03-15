import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos')) ?? [];
  }

  isSavedVideo(videoId) {
    return this.getSavedVideos().includes(videoId);
  }

  saveVideo(videoId) {
    const savedVideos = this.getSavedVideos();

    if (this.isSavedVideo(videoId) && savedVideos.length >= MAX_SAVED_VIDEOS_LENGTH) return;

    savedVideos.push(videoId);
    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }
}
