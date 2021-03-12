import { LOCAL_STORAGE_KEYS } from '../constants.js';

export default class Subject {
  constructor() {
    this.observers = {
      [LOCAL_STORAGE_KEYS.WATCH_LIST]: [],
      [LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST]: [],
    };
  }

  subscribe(key, observer) {
    const newObservers = Object.assign({}, this.observers);
    newObservers[key] = [...newObservers[key], observer];

    this.observers = newObservers;
  }

  unsubscribe(key, observer) {
    const newObservers = Object.assign({}, this.observers);
    newObservers[key] = newObservers[key].filter((_observer) => _observer !== observer);

    this.observers = newObservers;
  }

  notify(key) {
    if (this.observers[key].length > 0) {
      this.observers[key].forEach((observer) => observer.update());
    }
  }

  notifyAll() {
    Object.keys(this.observers).forEach((key) => {
      if (this.observers[key].length > 0) {
        this.observers[key].forEach((observer) => observer.update());
      }
    });
  }
}
