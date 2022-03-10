import {
  ERROR_MESSAGE_USER_STORAGE_OVERFLOW,
  STORAGE_MAX_COUNT,
} from "./constants/constants";

export default class UserStorage {
  constructor() {
    this.storage = JSON.parse(localStorage.getItem("videos")) || [];
  }

  isSavedVideoId(responseId) {
    return this.storage.includes(responseId);
  }

  addStorage(data) {
    if (this.storage.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE_USER_STORAGE_OVERFLOW);
    }

    this.storage = [...this.storage, data];
    this.setLocalStorage();
  }

  getStorage() {
    return this.storage;
  }

  setLocalStorage() {
    localStorage.setItem("videos", JSON.stringify(this.storage));
  }
}
