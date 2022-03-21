class SearchVideoStore {
  static _instance = null;

  static get instance() {
    if (!SearchVideoStore._instance) {
      SearchVideoStore._instance = new SearchVideoStore();
    }
    return SearchVideoStore._instance;
  }

  #videos = [];

  #subscribers = [];

  subscribe(element) {
    this.#subscribers.push(element);
  }

  dispatch(action, data) {
    const newVideos = [...this.getVideos(), ...data];

    this.#videos = newVideos;

    this.#subscribers.forEach((subscriber) => {
      subscriber.notify(action, data);
    });
  }

  findVideo(videoId) {
    return this.getVideos().find((video) => video.id === videoId);
  }

  getVideos() {
    return this.#videos;
  }
}

export default SearchVideoStore;
