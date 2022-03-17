import {
  ERROR_MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  STORAGE_KEY_SAVED_VIDEOS,
} from '../util/constants.js';

export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_VIDEOS));
  }

  saveVideo(newVideoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_COUNT)
      throw new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE);

    const newVideo = { videoId: newVideoId };

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify([...savedVideos, newVideo]));
  }

  removeVideo(newVideoId) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length <= 0) throw new Error(ERROR_MESSAGE.NO_REMOVABLE_VIDEO_EXIST);

    const restSavedVideos = savedVideos.filter(({ videoId }) => videoId !== newVideoId);

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(restSavedVideos));
  }

  getSpecificVideo(specificVideoId) {
    const savedVideos = this.getSavedVideos() || [];

    return savedVideos.find(({ videoId }) => videoId === specificVideoId);
  }

  init() {
    localStorage.clear();
  }
}
