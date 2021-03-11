import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
import {
  ERROR_MESSAGE,
  SEARCH,
  SELECTOR,
  STORAGE,
} from '../constants/constant.js';
class StorageModel {
  #savedVideo;
  #keywords;
  #showWatched;

  constructor() {
    this.#savedVideo = [];
    this.#keywords = [];
    this.#showWatched = null;
  }

  init() {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#keywords = getJSONFromLocalStorage(STORAGE.KEY_KEYWORDS);
  }

  updateVideoWatched(target) {
    this.#savedVideo.forEach(info => {
      if (
        info.url === target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url
      ) {
        info.watched = !info.watched;
      }
    });
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

  filterVideos = showWatched => {
    this.#showWatched = showWatched;
    return this.#savedVideo.filter(video => video.watched === showWatched);
  };

  get showWatched() {
    return this.#showWatched;
  }

  deleteSelectedVideo(target) {
    this.#savedVideo = this.#savedVideo.filter(
      info =>
        info.url !== target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url
    );
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

  // TODO: keyword와 savedVideo 분리하는거는 어떨까?
  saveVideo = json => {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    if (this.#savedVideo.length === STORAGE.MAX_SAVED_VIDEO_LENGTH) {
      alert(ERROR_MESSAGE.OVER_MAX_VIDEO_LENGTH);
      return;
    }
    this.#savedVideo.push(json);
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  };

  findVideoByInfo = info => {
    return (
      getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO).filter(
        savedVideo => info.url === savedVideo.url
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

  get savedVideos() {
    return this.#savedVideo;
  }

  get savedVideoCount() {
    return this.#savedVideo.length;
  }

  get recentKeywords() {
    return this.#keywords;
  }
}

export default StorageModel;
