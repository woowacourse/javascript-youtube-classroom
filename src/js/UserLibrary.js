export default class UserLibrary {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("videos")) || [];
  }

  isSavedVideoId(responseId) {
    return this.store.includes(responseId);
  }

  setData(data) {
    if (this.store.length >= 100) {
      throw new Error("데이터는 101개 이상 저장하실 수 없습니다.");
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
