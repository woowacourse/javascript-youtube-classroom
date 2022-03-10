import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos'));
  }

  saveVideo(videoId) {
    const savedVideos = this.getSavedVideos() ?? [];
    const newVideo = { videoId };

    if (savedVideos.length >= MAX_SAVED_VIDEOS_LENGTH) return;

    savedVideos.push(newVideo);
    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }
}
