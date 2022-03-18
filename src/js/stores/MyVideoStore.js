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

  dispatch() {
    const newVideos = this.loadVideos();

    this.#videos = newVideos;

    this.#subscribers.forEach((subscriber) => {
      subscriber.notify(this.getVideos());
    });
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
