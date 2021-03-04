import { LOCAL_STORAGE_KEYS } from './constants.js';

export default class Store {
  constructor() {
    this.init();
  }

  init() {
    // TODO: localStorage가 초기화되는 조건 수정 필요
    if (localStorage.length <= 1) {
      this.save(LOCAL_STORAGE_KEYS.WATCH_LIST, []);
      this.save(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, []);
    }
  }

  pushItem(key, value) {
    const data = this.load(key) || [];

    if (Array.isArray(data)) {
      data.push(value);
      this.save(key, data);
    }
  }

  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
