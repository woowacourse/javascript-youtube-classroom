import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
import { ERROR_MESSAGE, SEARCH, STORAGE } from '../constants/constant.js';
class StorageModel {
  #myVideo;
  #keywords;
  #showWatched;

  constructor() {
    this.#myVideo = [];
    this.#keywords = [];
    this.#showWatched = null;
  }

  init() {
    this.#myVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#keywords = getJSONFromLocalStorage(STORAGE.KEY_KEYWORDS);
  }

  updateVideoWatched(target) {
    this.#myVideo.forEach(info => {
      if (info.url === target.closest('.video-info-buttons').dataset.url) {
        info.watched = !info.watched;
      }
    });
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#myVideo);
  }

  get myVideos() {
    // TODO: getJSON ? 변수그냥 사용? 추후 고민하기
    return this.#myVideo;
  }

  filterVideos = showWatched => {
    this.#showWatched = showWatched;
    return this.#myVideo.filter(video => video.watched === showWatched);
  };

  get showWatched() {
    return this.#showWatched;
  }

  deleteSelectedVideo(target) {
    this.#myVideo = this.#myVideo.filter(
      info => info.url !== target.closest('.video-info-buttons').dataset.url
    );
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#myVideo);
  }

  // TODO: keyword와 myVideo 분리하는거는 어떨까?
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
