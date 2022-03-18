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
  // SearchResult : 데이터가 없으면 no result를 띄우기 위해
  // VideoList : 영상이 검색되면 데이터를 받아옴

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
