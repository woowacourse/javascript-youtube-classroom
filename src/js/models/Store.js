import {
  updateRecentChips,
  updateSavedVideoIds,
  updateWatchedVideoIds,
  getStorageData,
} from '../utils/localStorage.js';
import { STORE_KEYS } from '../utils/constants.js';

export default class Store {
  constructor() {
    this._observers = [];
    this._state = {};

    this.load();
  }

  load() {
    this._state = {
      ...this._state,
      recentKeywords: getStorageData(STORE_KEYS.RECENT_KEYWORDS),
      savedVideoIds: getStorageData(STORE_KEYS.SAVED_VIDEO_IDS),
      watchedVideoIds: getStorageData(STORE_KEYS.WATCHED_VIDEO_IDS),
    };
  }

  save(key, value) {
    const updateLocalStorage = {
      [STORE_KEYS.RECENT_KEYWORDS]: updateRecentChips,
      [STORE_KEYS.SAVED_VIDEO_IDS]: updateSavedVideoIds,
      [STORE_KEYS.WATCHED_VIDEO_IDS]: updateWatchedVideoIds,
    };

    const updatedResult = updateLocalStorage[key](value);
    this._state = { ...this._state, [key]: updatedResult };
  }

  update(data = {}) {
    Object.entries(data).forEach(([key, value]) => {
      this.save(key, value);
    });

    this.notify();
  }

  register(observer) {
    this._observers = [...this._observers, observer];
  }

  unregister(observer) {
    this._observers = this._observers.filter(
      (registeredObserver) => registeredObserver !== observer,
    );
  }

  notify() {
    if (this._observers.length > 0) {
      this._observers.forEach((observer) => observer.update());
    }
  }

  get state() {
    return this._state;
  }
}
