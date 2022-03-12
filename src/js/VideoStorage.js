import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";

export default class VideoStorage {
  constructor() {
    this.storage = JSON.parse(localStorage.getItem("videos")) || [];
  }

  isSavedVideoId(responseId) {
    return this.storage.includes(responseId);
  }

  addVideoData(data) {
    if (this.storage.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE.VIDEO_STORAGE_OVERFLOW);
    }

    this.storage = [...this.storage, data];
    localStorage.setItem("videos", JSON.stringify(this.storage));
  }

  getStorage() {
    return this.storage;
  }
}
