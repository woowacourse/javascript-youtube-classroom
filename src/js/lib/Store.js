import { LOCAL_STORAGE_KEYS } from '../constants.js';
import Subject from './Subject.js';

export default class Store extends Subject {
  constructor() {
    super();

    this.init();
  }

  init() {
    Object.values(LOCAL_STORAGE_KEYS).forEach((KEY) => {
      const data = this.load(KEY);
      if (!data) this.save(KEY, []);

      this.state = { ...this.state, [KEY]: data || [] };
    });
  }

  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  update(data = {}) {
    this.state = { ...this.state, ...data };

    Object.entries(data).forEach(([key, value]) => {
      this.save(key, value);
    });

    this.notify();
  }

  get() {
    return Object.assign({}, this.state);
  }
}
