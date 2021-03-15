import {
  updateRecentChips,
  pushSavedVideoIds,
  popSavedVideoId,
  updateWatchedVideoIds,
  popWatchedVideoId,
  updateLikedVideoIds,
  popLikedVideoId,
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
      likedVideoIds: getStorageData(STORE_KEYS.LIKED_VIDEO_IDS),
    };
  }

  updateState(key, value, isDelete) {
    const updateLocalStorage = {
      [STORE_KEYS.RECENT_KEYWORDS]: updateRecentChips,
      [STORE_KEYS.SAVED_VIDEO_IDS]: isDelete
        ? popSavedVideoId
        : pushSavedVideoIds,
      [STORE_KEYS.WATCHED_VIDEO_IDS]: isDelete
        ? popWatchedVideoId
        : updateWatchedVideoIds,
      [STORE_KEYS.LIKED_VIDEO_IDS]: isDelete
        ? popLikedVideoId
        : updateLikedVideoIds,
    };

    const updatedResult = updateLocalStorage[key](value);
    this._state = { ...this._state, [key]: updatedResult };
  }

  update(data = {}, isDelete = false) {
    Object.entries(data).forEach(([key, value]) => {
      this.updateState(key, value, isDelete);
    });

    this.notify();
  }

  register(observer) {
    this._observers = [...this._observers, observer];
  }

  notify() {
    if (this._observers.length > 0) {
      this._observers.forEach((observer) => observer.update());
    }
  }

  get state() {
    return this._state;
  }

  get computed() {
    return {
      unWatchedVideoIds: this._state.savedVideoIds.filter(
        (videoId) => !this._state.watchedVideoIds.includes(videoId),
      ),
    };
  }
}
