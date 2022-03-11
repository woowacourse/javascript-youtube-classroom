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
    // eslint-disable-next-line prefer-template
    this.store[key] = String(value + '');
  }

  removeItem(key) {
    delete this.store[key];
  }
}
