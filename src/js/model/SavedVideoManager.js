import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils/localStorage.js";
import { STORAGE } from "../utils/constants.js";

class SavedVideoManager {
  constructor() {
    this.subscribers = [];
    this.savedVideos = getDataFromLocalStorage(STORAGE.SAVED_VIDEOS, []);
    this.likedVideos = getDataFromLocalStorage(STORAGE.LIKED_VIDEOS, []);
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  getSavedVideos() {
    return this.savedVideos;
  }

  getLikedVideos() {
    return this.likedVideos;
  }

  _publish() {
    this.subscribers.forEach(subscriber => {
      subscriber({ savedVideos: this.getSavedVideos() });
    });
  }

  _setState({ savedVideos, likedVideos }) {
    this.savedVideos = savedVideos ?? this.savedVideos;
    this.likedVideos = likedVideos ?? this.likedVideos;

    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, this.savedVideos);
    setDataToLocalStorage(STORAGE.LIKED_VIDEOS, this.likedVideos);
    this._publish();
  }
}

export default new SavedVideoManager();
