import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos'));
  }

  saveVideo(videoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_LENGTH) return;

    savedVideos.push(videoId);
    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }

  isSavedVideo(videoId) {
    const savedVideos = this.getSavedVideos() ?? [];
    return savedVideos.includes(videoId);
  }
}
