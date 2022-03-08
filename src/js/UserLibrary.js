export default class UserLibrary {
  constructor() {
    this.store = [];
    this.init();
  }

  init() {
    try {
      this.store = JSON.parse(localStorage.getItem("videos"));
    } catch (error) {
      console.log(error);
    }
  }

  setData(data) {
    if (this.store.length >= 100) {
      throw new Error("데이터는 101개 이상 저장하실 수 없습니다.");
    }

    this.store = [...this.store, data];
  }

  getData() {
    return this.store;
  }

  setLocalStorage() {
    localStorage.setItem("videos", this.store);
  }
}
