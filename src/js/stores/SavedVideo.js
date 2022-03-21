import { deduplicate } from '../utils';
import { VIDEO } from '../constants';

class SavedVideo {
  static _instance = null;

  static get instance() {
    if (!SavedVideo._instance) {
      SavedVideo._instance = new SavedVideo();
    }
    return SavedVideo._instance;
  }

  #videos;

  #subscribers = [];

  constructor() {
    this.#videos = this.loadVideos();
  }

  subscribe(element) {
    this.#subscribers.push(element);
  }

  dispatch(action, data, target) {
    localStorage.setItem('videos', JSON.stringify(deduplicate(data)));
    this.#videos = this.loadVideos();

    this.#subscribers.forEach((subscriber) => {
      subscriber.notify(action, data, target);
    });
  }

  getVideos() {
    return this.#videos;
  }

  loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) ?? [];
  }

  filterVideos(state) {
    return this.#videos.filter((video) => video.isWatched === state);
  }

  findVideo(videoId) {
    return this.#videos.find((video) => video.id === videoId);
  }

  isStorable() {
    return this.#videos.length < VIDEO.MAX_SAVABLE_COUNT;
  }
}

export default SavedVideo;
