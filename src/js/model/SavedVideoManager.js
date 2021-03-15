import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils/localStorage.js";
import { STORAGE } from "../utils/constants.js";

class SavedVideoManager {
  constructor() {
    this.subscribers = [];
    this.savedVideos = getDataFromLocalStorage(STORAGE.SAVED_VIDEOS, []);
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish() {
    this.subscribers.forEach(subscriber => {
      subscriber({ savedVideos: this.getSavedVideos() });
    });
  }

  setState({ savedVideos }) {
    this.savedVideos = savedVideos ?? this.savedVideos;

    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, this.savedVideos);
    this.publish();
  }

  getSavedVideos() {
    return this.savedVideos;
  }
}

export default new SavedVideoManager();
