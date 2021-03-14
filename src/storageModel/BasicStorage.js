import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../storage/localStorageUtil.js';

export default class BasicStorage {
  _key;

  constructor(key) {
    this._key = key;
  }

  getItem() {
    return getLocalStorageItem(this._key);
  }

  setItem(item) {
    setLocalStorageItem(this._key, item);
  }
}
