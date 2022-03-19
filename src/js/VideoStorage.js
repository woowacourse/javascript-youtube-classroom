import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";

export default class VideoStorage {
  constructor() {
    this.videos = JSON.parse(localStorage.getItem("videos")) || [];
  }

  isSavedVideoId(responseId) {
    return this.videos.includes(responseId);
  }

  checkTypeVideoEmpty(isWatchedVideoOnly) {
    return !this.getStorage().some(
      (item) => item.isWatched === isWatchedVideoOnly
    );
  }

  addVideoData(data) {
    if (this.videos.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE.VIDEO_STORAGE_OVERFLOW);
    }

    this.videos = [...this.videos, data];
    localStorage.setItem("videos", JSON.stringify(this.videos));
  }

  getStorage() {
    return this.videos;
  }

  getVideoIdArray() {
    return this.getStorage().map((item) => item.videoId);
  }

  setVideoStateWatched(target) {
    const targetIndex = this.getStorage().findIndex(
      (item) => item.videoId === target
    );

    this.videos[targetIndex].isWatched = !this.videos[targetIndex].isWatched;
    localStorage.setItem("videos", JSON.stringify(this.videos));
  }

  deleteVideo(target) {
    const targetIndex = this.getStorage().findIndex(
      (item) => item.videoId === target
    );

    this.videos.splice(targetIndex, 1);
    localStorage.setItem("videos", JSON.stringify(this.videos));
  }
}
