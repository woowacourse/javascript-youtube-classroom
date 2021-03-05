import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
import { SEARCH } from '../constants/constant.js';
class StorageModel {
  #myVideo;
  #keywords;

  constructor() {
    this.#myVideo = [];
    this.#keywords = [];
  }

  init() {
    setJSONToLocalStorage('myVideo', this.#myVideo);
    setJSONToLocalStorage('keywords', this.#keywords);
  }

  saveVideo = json => {
    this.#myVideo = getJSONFromLocalStorage('myVideo');
    if (myVideo.length === 100) return;
    this.#myVideo.push(json);
    setJSONToLocalStorage('myVideo', this.#myVideo);
  };

  findVideoByInfo = info => {
    return (
      getJSONFromLocalStorage('myVideo').filter(
        myVideo => info.channelUrl === myVideo.channelUrl
      ).length > 0
    );
  };

  saveRecentKeyword = keyword => {
    this.#keywords = [
      ...new Set([keyword, ...getJSONFromLocalStorage('keywords')]),
    ];

    if (this.#keywords.length > SEARCH.RECENT_KEYWORD_MAX_LENGTH) {
      this.#keywords = this.#keywords.slice(
        0,
        SEARCH.RECENT_KEYWORD_MAX_LENGTH
      );
    }

    setJSONToLocalStorage('keywords', this.#keywords);
  };

  get savedVideoLength() {
    return this.#myVideo.length;
  }

  get recentKeywords() {
    return this.#keywords;
  }
}

export default StorageModel;
