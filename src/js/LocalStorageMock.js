import { MAX_SAVE_COUNT, MESSAGE } from './constants';

export default class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    if (!this.store[key]) {
      this.store[key] = [];
    }
    if (this.store[key].length >= MAX_SAVE_COUNT) {
      throw Error(MESSAGE.ERROR_EXCESS_SAVE_COUNT);
    }
    this.store[key].push(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}
