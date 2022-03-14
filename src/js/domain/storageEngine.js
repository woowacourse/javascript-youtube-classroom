import { ERROR_MESSAGE, MAX_SAVED_VIDEOS_COUNT } from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos'));
  }

  saveVideo(videoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_COUNT)
      throw new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE);

    const newVideo = { videoId };
    savedVideos.push(newVideo);

    localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
  }

  getSpecificVideo(specificVideoId) {
    const savedVideos = this.getSavedVideos() || [];

    return savedVideos.filter(({ videoId }) => videoId === specificVideoId)[0];
  }

  init() {
    localStorage.clear();
  }
}
