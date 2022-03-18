import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos')) ?? [];
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
