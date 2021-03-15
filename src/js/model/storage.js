import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
import {
  CLASS,
  NAV,
  SEARCH,
  SELECTOR,
  STORAGE,
} from '../constants/constant.js';
class StorageModel {
  #savedVideo;
  #keywords;
  #navValue;

  constructor() {
    this.#savedVideo = [];
    this.#keywords = [];
    this.#navValue = null;
  }

  init() {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#keywords = getJSONFromLocalStorage(STORAGE.KEY_KEYWORDS);
  }

  filterVideos = navValue => {
    this.#navValue = navValue;
    const navFunction = {
      [NAV.TO_WATCH_VIDEOS]: this.#savedVideo.filter(
        video => video.watched === false
      ),
      [NAV.WATCHED_VIDEOS]: this.#savedVideo.filter(
        video => video.watched === true
      ),
      [NAV.LIKED_VIDEOS]: this.#savedVideo.filter(
        video => video.liked === true
      ),
    };

    return navFunction[navValue];
  };

  updateVideoState(target) {
    const targetUrl = target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url;
    switch (true) {
      case target.classList.contains(CLASS.WATCHED):
        this.#updateVideoWatched(targetUrl);
        break;

      case target.classList.contains(CLASS.LIKED):
        this.#updateVideoLiked(targetUrl);
        break;

      case target.classList.contains(CLASS.DELETE):
        this.#deleteSelectedVideo(targetUrl);
        break;
    }

    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

  #updateVideoWatched(url) {
    this.#savedVideo.forEach(info => {
      if (info.url === url) {
        info.watched = !info.watched;
      }
    });
  }

  #updateVideoLiked(url) {
    this.#savedVideo.forEach(info => {
      if (info.url === url) {
        info.liked = !info.liked;
      }
    });
  }

  #deleteSelectedVideo(url) {
    this.#savedVideo = this.#savedVideo.filter(info => info.url !== url);
  }

  saveVideo = json => {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#savedVideo.push(json);
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  };

  findVideoSaved = info => {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    return (
      this.#savedVideo.filter(savedVideo => info.url === savedVideo.url)
        .length > 0
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

  get navValue() {
    return this.#navValue;
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
