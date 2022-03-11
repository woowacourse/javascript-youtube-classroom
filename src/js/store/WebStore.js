import { ALERT_MESSAGE, MAX_SAVE_COUNT } from '../constant.js';

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
    return [...this.#cached] || JSON.parse(localStorage.getItem(this.#key));
  }

  save(data) {
    if (this.#cached.length >= MAX_SAVE_COUNT) {
      throw new Error(ALERT_MESSAGE.EXCEED_MAX_SAVE_VOLUME);
    }
    this.#cache(data);
    localStorage.setItem(this.#key, JSON.stringify(data));
  }
}

export const webStore = new WebStore('savedVideos');
