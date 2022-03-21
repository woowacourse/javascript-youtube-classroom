import { VIDEO } from '../constants';

class MyVideoStore {
  static _instance = null;

  static get instance() {
    if (!MyVideoStore._instance) {
      MyVideoStore._instance = new MyVideoStore();
    }
    return MyVideoStore._instance;
  }

  #videos = [];

  #subscribers = [];

  constructor() {
    this.#videos = this.loadVideos();
  }

  subscribe(element) {
    this.#subscribers.push(element);
  }

  dispatch(data) {
    localStorage.setItem('videos', JSON.stringify(data));
    const newVideos = this.loadVideos();

    this.#videos = newVideos;

    this.#subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }

  canSaveVideo() {
    return this.getVideos().length < VIDEO.MAX_SAVABLE_COUNT;
  }

  findVideo(videoId) {
    return this.getVideos().find((video) => video.details.id === videoId);
  }

  getPlaylistVideos() {
    return this.getVideos().filter((video) => !video.isWatched);
  }

  getWatchedVideos() {
    return this.getVideos().filter((video) => video.isWatched);
  }

  getVideos() {
    return this.#videos;
  }

  loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) ?? [];
  }
}

export default MyVideoStore;
