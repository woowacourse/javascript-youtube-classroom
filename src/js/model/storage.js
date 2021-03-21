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

  filterVideos = showWatched => {
    this.#showWatched = showWatched;
    return this.#savedVideo.filter(video => video.watched === showWatched);
  };

  updateVideoWatched(target) {
    const targetUrl = target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url;
    this.#savedVideo.forEach(info => {
      if (info.url === targetUrl) {
        info.watched = !info.watched;
      }
    });

    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

  deleteSelectedVideo(target) {
    const targetUrl = target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url;
    this.#savedVideo = this.#savedVideo.filter(info => info.url !== targetUrl);

    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

  saveVideo = json => {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#savedVideo.push(json);
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  };

  findVideoSaved = info => {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
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

  get showWatched() {
    return this.#showWatched;
  }

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
