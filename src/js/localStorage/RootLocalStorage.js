export default class RootLocalStorage {
  constructor(key) {
    this.key = key;
    this.cached = JSON.parse(localStorage.getItem(this.key)) || [];
  }

  cache(data) {
    this.cached = [...data];
  }

  load() {
    return [...this.cached] || JSON.parse(localStorage.getItem(this.key));
  }

  save(data) {
    this.cache(data);
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    this.cached = [];
    localStorage.clear();
  }
}
