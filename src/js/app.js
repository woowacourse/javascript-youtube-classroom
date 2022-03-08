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
    this.store = [...this.store, data];
  }

  getData() {
    return this.store;
  }

  setLocalStorage() {
    localStorage.setItem("videos", this.store);
  }
}
