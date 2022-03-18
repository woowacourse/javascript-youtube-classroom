class SearchedVideo {
  static _instance = null;

  static get instance() {
    if (!SearchedVideo._instance) {
      SearchedVideo._instance = new SearchedVideo();
    }
    return SearchedVideo._instance;
  }

  #videos = [];

  #subscribers = [];

  subscribe(element) {
    this.#subscribers.push(element);
  }

  dispatch(action, data) {
    this.#videos = [...this.#videos, ...data];

    this.#subscribers.forEach((subscriber) => {
      subscriber.notify(action, data);
    });
  }

  findVideo(videoId) {
    return this.#videos.find((video) => video.id === videoId);
  }
}

export default SearchedVideo;
