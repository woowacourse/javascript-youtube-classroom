export default class WebStore {
  #key;

  #cached;

  constructor(key) {
    this.#key = key;
    this.#cached = JSON.parse(localStorage.getItem(this.#key)) || [];
  }

  #cache(data) {
    this.#cached = [...data];
  }

  load() {
    return [...this.#cached]
  }

  save(data) {
    this.#cache(data);
    localStorage.setItem(this.#key, JSON.stringify(data));
  }
}
