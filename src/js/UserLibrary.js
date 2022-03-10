import ERROR_MESSAGE from "./constants/ERROR_MESSAGE";

export default class UserLibrary {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("videos")) || [];
  }

  isSavedVideoId(responseId) {
    return this.store.includes(responseId);
  }

  setData(data) {
    if (this.store.length >= 100) {
      throw new Error(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
    }

    this.store = [...this.store, data];
    this.setLocalStorage();
  }

  getData() {
    return this.store;
  }

  setLocalStorage() {
    localStorage.setItem("videos", JSON.stringify(this.store));
  }
}
