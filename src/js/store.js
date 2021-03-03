export default class Store {
  constructor() {
    this.init();
  }

  init() {
    if (localStorage.length <= 0) {
      this.save('watchList', []);
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
