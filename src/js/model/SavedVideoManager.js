import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils/localStorage.js";
import { STORAGE } from "../utils/constants.js";

class SavedVideoManager {
  static instance;

  constructor() {
    if (SavedVideoManager.instance) return SavedVideoManager.instance;

    this.subscribers = [];
    this._savedVideos = getDataFromLocalStorage(STORAGE.SAVED_VIDEOS, []);
    this._likedVideos = getDataFromLocalStorage(STORAGE.LIKED_VIDEOS, []);

    SavedVideoManager.instance = this;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  get savedVideos() {
    return this._savedVideos;
  }

  get likedVideos() {
    return this._likedVideos;
  }

  _publish() {
    this.subscribers.forEach(subscriber => {
      subscriber({ savedVideos: this.savedVideos });
    });
  }

  _setState({ savedVideos, likedVideos }) {
    this._savedVideos = savedVideos ?? this._savedVideos;
    this._likedVideos = likedVideos ?? this._likedVideos;

    setDataToLocalStorage(STORAGE.SAVED_VIDEOS, this._savedVideos);
    setDataToLocalStorage(STORAGE.LIKED_VIDEOS, this._likedVideos);
    this._publish();
  }
}

export default SavedVideoManager;
