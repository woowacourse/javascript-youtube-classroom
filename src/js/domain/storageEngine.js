import { MAX_SAVED_VIDEOS_LENGTH } from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos'));
  }

  saveVideo(videoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_LENGTH) return;

    const newVideo = { videoId };
    savedVideos.push(newVideo);

    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }

  getSpecificVideo(specificVideoId) {
    const savedVideos = this.getSavedVideos();

    return savedVideos.filter(({ videoId }) => videoId === specificVideoId);
  }

  init() {
    localStorage.clear();
  }
}