import {
  ERROR_MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  STORAGE_KEY_SAVED_VIDEOS,
} from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_VIDEOS));
  }

  saveVideo(videoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_COUNT)
      throw new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE);

    const newVideo = { videoId };

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify([...savedVideos, newVideo]));
  }

  getSpecificVideo(specificVideoId) {
    const savedVideos = this.getSavedVideos() || [];

    return savedVideos.find(({ videoId }) => videoId === specificVideoId);
  }

  init() {
    localStorage.clear();
  }
}
