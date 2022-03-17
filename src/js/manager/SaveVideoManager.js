import { LOCAL_DB } from "../utils/contants.js";
import { getLocalStorage, saveLocalStorage } from "../utils/localStorage.js";

export default class SaveVideoManager {
  constructor() {
    this.handlers = new Map();
    this.handlerIndex = 0;
    this.state = {
      videos: getLocalStorage(LOCAL_DB.VIDEO_ID),
    };
  }

  subscribe(handler) {
    this.handlers.set(++this.handlerIndex, handler);
    return this.handlerIndex;
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }

  getSavedVideos() {
    return this.state.videos;
  }

  getSavedIds() {
    return this.state.videos.map((video) => video.id);
  }

  saveVideos(id) {
    this.#setState({ videos: [...this.state.videos, { id, watched: false }] });
  }

  #setState(newState) {
    this.state = { ...this.state, ...newState };
    saveLocalStorage(LOCAL_DB.VIDEO_ID, this.state.videos);
    this.#notify();
  }

  #notify() {
    this.handlers.forEach((handler) => handler());
  }
}
