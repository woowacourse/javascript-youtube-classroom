import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";

export default class VideoStorage {
  #videos = JSON.parse(localStorage.getItem("videos")) || [];

  checkTypeVideoEmpty(isWatchedVideoOnly) {
    return !this.getVideos().some(
      (item) => item.isWatched === isWatchedVideoOnly
    );
  }

  addVideoData(data) {
    if (this.#videos.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE.VIDEO_STORAGE_OVERFLOW);
    }

    this.#videos = [...this.#videos, data];
    localStorage.setItem("videos", JSON.stringify(this.#videos));
  }

  getVideos() {
    return this.#videos;
  }

  getVideoIdArray() {
    return this.getVideos().map((item) => item.videoId);
  }

  setVideoStateWatched(target) {
    const targetIndex = this.getVideos().findIndex(
      (item) => item.videoId === target
    );

    this.#videos[targetIndex].isWatched = !this.#videos[targetIndex].isWatched;
    localStorage.setItem("videos", JSON.stringify(this.#videos));
  }

  deleteVideo(target) {
    const targetIndex = this.getVideos().findIndex(
      (item) => item.videoId === target
    );

    this.#videos.splice(targetIndex, 1);
    localStorage.setItem("videos", JSON.stringify(this.#videos));
  }
}
