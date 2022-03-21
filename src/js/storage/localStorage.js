import { parseJSON } from '../utils';

class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  load(defaultValue) {
    return parseJSON(window.localStorage.getItem(this.key), defaultValue);
  }

  save(value) {
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export default LocalStorage;
