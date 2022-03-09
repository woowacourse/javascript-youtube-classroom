import { $ } from './utils';

class VideoStore {
  static _instance = null;

  static get instance() {
    if (!VideoStore._instance) {
      VideoStore._instance = new VideoStore();
    }
    return VideoStore._instance;
  }

  #state = [];

  dispatch(videos) {
    const newState = [...videos];

    this.#setState(newState);
    $('search-result').partialRender(videos);
  }

  getState() {
    return this.#state;
  }

  #setState(newState) {
    this.#state = newState;
  }
}

export default VideoStore;
