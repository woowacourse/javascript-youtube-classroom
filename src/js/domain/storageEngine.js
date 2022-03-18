import {
  ERROR_MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  STORAGE_KEY_SAVED_VIDEOS,
} from '../util/constants.js';

export default class StorageEngine {
  static _instance = null;

  static get instance() {
    if (!StorageEngine._instance) {
      StorageEngine._instance = new StorageEngine();
    }

    return StorageEngine._instance;
  }

  getSavedVideos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_VIDEOS)) ?? [];
  }

  saveVideo(video) {
    const savedVideos = this.getSavedVideos() ?? [];

    if (savedVideos.length >= MAX_SAVED_VIDEOS_COUNT)
      throw new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE);

    const newVideo = {
      ...video,
      isViewed: false,
    };

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify([...savedVideos, newVideo]));
  }

  removeVideo(videoId) {
    const savedVideos = this.getSavedVideos();

    const restSavedVideos = savedVideos.filter((video) => video.videoId !== videoId);

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(restSavedVideos));
  }

  checkVideoViewed(videoId) {
    const savedVideos = this.getSavedVideos();

    const targetVideo = savedVideos.find((video) => video.videoId === videoId);
    targetVideo.isViewed = true; // 여기서는 이미 복사한 object니까 이렇게 변경해도 다른 곳에 영향 안끼쳐서 괜찮아보임

    localStorage.setItem(STORAGE_KEY_SAVED_VIDEOS, JSON.stringify(savedVideos));
  }

  getSpecificVideo(videoId) {
    const savedVideos = this.getSavedVideos() || [];

    return savedVideos.find((video) => video.videoId === videoId);
  }

  init() {
    localStorage.clear();
  }
}
