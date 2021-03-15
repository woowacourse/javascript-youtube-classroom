import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
import { NAV, SEARCH, SELECTOR, STORAGE } from '../constants/constant.js';
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
    // TODO: 아래 개선
    if (navValue === NAV.TO_WATCH_VIDEOS) {
      return this.#savedVideo.filter(video => video.watched === false);
    } else if (navValue === NAV.WATCHED_VIDEOS) {
      return this.#savedVideo.filter(video => video.watched === true);
    } else if (navValue === NAV.LIKED_VIDEOS) {
      return this.#savedVideo.filter(video => video.liked === true);
    }
  };

  // TODO : 아래 함수들 일반화 시키기
  updateVideoWatched(target) {
    const targetUrl = target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url;
    this.#savedVideo.forEach(info => {
      if (info.url === targetUrl) {
        info.watched = !info.watched;
      }
    });

    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

  updateVideoLiked(target) {
    const targetUrl = target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url;
    this.#savedVideo.forEach(info => {
      if (info.url === targetUrl) {
        info.liked = !info.liked;
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
