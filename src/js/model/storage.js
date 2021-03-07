import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
import { ERROR_MESSAGE, SEARCH, STORAGE } from '../constants/constant.js';
class StorageModel {
  #myVideo;
  #keywords;

  constructor() {
    this.#myVideo = [];
    this.#keywords = [];
  }

  init() {
    this.#myVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#keywords = getJSONFromLocalStorage(STORAGE.KEY_KEYWORDS);
  }

  saveVideo = json => {
    this.#myVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    if (this.#myVideo.length === STORAGE.MAX_SAVED_VIDEO_LENGTH) {
      alert(ERROR_MESSAGE.OVER_MAX_VIDEO_LENGTH);
      return;
    }
    this.#myVideo.push(json);
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#myVideo);
  };

  findVideoByInfo = info => {
    return (
      getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO).filter(
        myVideo => info.url === myVideo.url
      ).length > 0
    );
  };

  saveRecentKeyword = keyword => {
    this.#keywords = [
      ...new Set([keyword, ...getJSONFromLocalStorage(STORAGE.KEY_KEYWORDS)]),
    ];

    if (this.#keywords.length > SEARCH.RECENT_KEYWORD_MAX_LENGTH) {
      this.#keywords = this.#keywords.slice(
        0,
        SEARCH.RECENT_KEYWORD_MAX_LENGTH
      );
    }

    setJSONToLocalStorage(STORAGE.KEY_KEYWORDS, this.#keywords);
  };

  get savedVideoCount() {
    return this.#myVideo.length;
  }

  get recentKeywords() {
    return this.#keywords;
  }
}

export default StorageModel;
