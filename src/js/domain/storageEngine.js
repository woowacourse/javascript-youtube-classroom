import { ERROR_MESSAGE, MAX_SAVED_VIDEOS_COUNT, VIDEOS_TYPE } from '../util/constants.js';

export default class StorageEngine {
  static _instance = null;

  static get instance() {
    if (!StorageEngine._instance) {
      StorageEngine._instance = new StorageEngine();
    }

    return StorageEngine._instance;
  }

  getVideosToView() {
    return JSON.parse(localStorage.getItem(VIDEOS_TYPE.VIDEOS_TO_VIEW)) ?? [];
  }

  getViewedVideos() {
    return JSON.parse(localStorage.getItem(VIDEOS_TYPE.VIEWED_VIDEOS)) ?? [];
  }

  saveVideo(video, videoType) {
    const targetVideos = this.#getTargetVideos(videoType);

    if (targetVideos.length >= MAX_SAVED_VIDEOS_COUNT)
      throw new Error(ERROR_MESSAGE.NO_MORE_VIDEO_SAVABLE);

    const storageKey = this.#getStorageKey(videoType);

    localStorage.setItem(storageKey, JSON.stringify([...targetVideos, video]));
  }

  removeVideo(videoId, videoType) {
    const targetVideos = this.#getTargetVideos(videoType);

    const restTargetVideos = targetVideos.filter((video) => video.videoId !== videoId);

    const storageKey = this.#getStorageKey(videoType);

    localStorage.setItem(storageKey, JSON.stringify(restTargetVideos));
  }

  changeVideoViewed(videoId, currentVideoType) {
    const targetVideo = this.getSpecificVideo(videoId, currentVideoType);

    this.removeVideo(videoId, currentVideoType);

    const targetVideoType = this.#getTargetVideoType(currentVideoType);

    this.saveVideo(targetVideo, targetVideoType);
  }

  getSpecificVideo(videoId, videoType) {
    const targetVideos = this.#getTargetVideos(videoType);

    return targetVideos.find((video) => video.videoId === videoId);
  }

  #getTargetVideos(videoType) {
    if (videoType === VIDEOS_TYPE.VIDEOS_TO_VIEW) return this.getVideosToView();
    if (videoType === VIDEOS_TYPE.VIEWED_VIDEOS) return this.getViewedVideos();
  }

  #getStorageKey(videoType) {
    if (videoType === VIDEOS_TYPE.VIDEOS_TO_VIEW) return VIDEOS_TYPE.VIDEOS_TO_VIEW;
    if (videoType === VIDEOS_TYPE.VIEWED_VIDEOS) return VIDEOS_TYPE.VIEWED_VIDEOS;
  }

  #getTargetVideoType(currentVideoType) {
    if (currentVideoType === VIDEOS_TYPE.VIDEOS_TO_VIEW) return VIDEOS_TYPE.VIEWED_VIDEOS;
    if (currentVideoType === VIDEOS_TYPE.VIEWED_VIDEOS) return VIDEOS_TYPE.VIDEOS_TO_VIEW;
  }

  init() {
    localStorage.clear();
  }
}
