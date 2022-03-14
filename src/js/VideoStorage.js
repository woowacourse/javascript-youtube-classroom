import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";

export default class VideoStorage {
  constructor() {
    this.videos = JSON.parse(localStorage.getItem("videos")) || [];
  }

  isSavedVideoId(responseId) {
    return this.videos.includes(responseId);
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
}
