import { MAX_SAVE_AMOUNT, ERROR_MESSAGES } from '../constants/constants';

class ManageVideoStorage {
  #storedVideoObjects;

  #key;

  constructor() {
    this.#key = 'videoObjects';
    this.#storedVideoObjects = this.#getNewFromStorage();
  }

  getCachedVideoObjects() {
    return { ...this.#storedVideoObjects };
  }

  #getNewFromStorage() {
    return JSON.parse(localStorage.getItem(this.#key)) || {};
  }

  getFilteredIdFromStorage(filterBy, value) {
    const videoObjects = this.#storedVideoObjects;

    const filteredObjects = Object.keys(videoObjects).filter(
      (id) => videoObjects[id][filterBy] === value
    );

    return filteredObjects;
  }

  saveToStorage(insertObject) {
    const videoObjects = this.#storedVideoObjects;
    if (Object.keys(videoObjects).length >= MAX_SAVE_AMOUNT) {
      throw new Error(ERROR_MESSAGES.EXCEED_MAX_SAVE_AMOUNT);
    }
    videoObjects[insertObject.videoId] = insertObject;
    this.#overwriteStorage(videoObjects);
  }

  removeFromStorage(id) {
    const videoObjects = this.#storedVideoObjects;
    delete videoObjects[id];
    this.#overwriteStorage(videoObjects);
  }

  toggleWatchStatus(id) {
    const videoObject = this.#storedVideoObjects[id];
    videoObject.watched = !videoObject.watched;
    this.saveToStorage(videoObject);
  }

  #overwriteStorage(videoObjects) {
    localStorage.setItem(this.#key, JSON.stringify(videoObjects));
    this.#storedVideoObjects = videoObjects;
  }
}

export default ManageVideoStorage;
