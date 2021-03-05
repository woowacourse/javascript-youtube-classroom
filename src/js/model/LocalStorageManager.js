import { LOCALSTORAGE_KEYS } from '../constants/constants.js';

export default class LocalStorageManager {
  constructor() {
    this.key = {
      videos: LOCALSTORAGE_KEYS.VIDEOS,
      searchHistory: LOCALSTORAGE_KEYS.SEARCH_HISTORY,
    };
    this.init();
  }

  init() {
    if (this.getItem(this.key.videos) === null) {
      this.setItem(this.key.videos, []);
    }

    if (this.getItem(this.key.searchHistory) === null) {
      this.setItem(this.key.searchHistory, []);
    }
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(this.key[key]));
  }

  setItem(key, array) {
    localStorage.setItem(this.key[key], JSON.stringify(array));
  }
}
