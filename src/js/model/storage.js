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

  #filterOption;


  constructor() {
    this.#savedVideo = [];
    this.#keywords = [];
    this.#showWatched = null;
    this.#filterOption = 'all';

  }

  init() {
    this.#savedVideo = getJSONFromLocalStorage(STORAGE.KEY_MY_VIDEO);
    this.#keywords = getJSONFromLocalStorage(STORAGE.KEY_KEYWORDS);
  }

  updateVideoButtons(target) {
    const targetUrl = target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url;

    if (target.classList.contains('watched')) {
      this.#savedVideo.forEach(info => {
        if (info.url === targetUrl) {
          info.watched = !info.watched;
        }
      });
      setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
    } else if (target.classList.contains('thumbs-up')) {
      this.#savedVideo.forEach(info => {
        if (info.url === targetUrl) {
          info.liked = !info.liked;
        }
      });
      setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
    }
  }

  filterVideos = filterOption => {
    switch (filterOption) {
      case 'all':
        return this.#savedVideo;

      case 'liked':
        return this.#savedVideo.filter(video => video.liked);

      case 'watched':
        return this.#savedVideo.filter(video => video.watched);

      case 'willWatch':
        return this.#savedVideo.filter(video => !video.watched);

      default:
        return this.#savedVideo;
    }
  };

  deleteSelectedVideo(target) {
    this.#savedVideo = this.#savedVideo.filter(
      info =>
        info.url !== target.closest(SELECTOR.VIDEO_INFO_BUTTONS).dataset.url
    );
    setJSONToLocalStorage(STORAGE.KEY_MY_VIDEO, this.#savedVideo);
  }

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

  get filterOption() {
    return this.#filterOption;
  }

  set filterOption(newFilter) {
    return (this.#filterOption = newFilter);
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
