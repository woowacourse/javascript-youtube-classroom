import Subject from './Subject.js';

export default class Store extends Subject {
  constructor() {
    super();
    this.state = {
      watchList: [],
      searchResultList: [],
      recentKeywordList: [],
    };
  }

  update(data = {}) {
    this.state = { ...this.state, ...data };
    this.notify();
  }

  get() {
    return this.state;
  }
}
