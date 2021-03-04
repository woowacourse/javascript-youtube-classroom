export default class LocalStorageManager {
  constructor() {
    this.key = 'videos';
    this.init();
  }

  init() {
    if (this.getItem() === null) {
      this.setItem([]);
    }
  }

  getItem() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  setItem(savedVideos) {
    localStorage.setItem(this.key, JSON.stringify(savedVideos));
  }
}
