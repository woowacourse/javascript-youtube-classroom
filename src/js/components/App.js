import YoutubeAPIManager from '../model/YoutubeAPIManager.js';
import VideoSearchModal from './videoSearchModal/VideoSearchModal.js';
import VideoList from './videoList/VideoList.js';
import {
  $,
  $$,
  localStorageSetItem,
  localStorageGetItem,
} from '../utils/utils.js';
import { LOCALSTORAGE_KEYS, SELECTORS, TYPES } from '../constants/constants.js';

export const youtubeAPIManager = new YoutubeAPIManager();
export default class App {
  constructor($target) {
    this.$target = $target;
    this.setup();
  }

  setup() {
    this.localStorageSetup();
    this.states = {
      searchedVideos: [],
      searchHistory: localStorageGetItem(LOCALSTORAGE_KEYS.SEARCH_HISTORY),
      requestPending: false,
      savedVideoCount: Object.keys(
        localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS)
      ).length,
    };
  }

  run() {
    this.initRender();
    this.mount();
    this.selectDOM();
    this.bindEvent();
  }

  localStorageSetup() {
    if (localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS) === null) {
      localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, {});
    }

    if (localStorageGetItem(LOCALSTORAGE_KEYS.SEARCH_HISTORY) === null) {
      localStorageSetItem(LOCALSTORAGE_KEYS.SEARCH_HISTORY, []);
    }
  }

  initRender() {
    this.$target.innerHTML = `
    <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4">
        <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
        <nav class="d-flex justify-center">
          <button id="watch-later-button" class="btn mx-1">👁️ 볼 영상</button>
          <button id="watched-button" class="btn mx-1">✅ 본 영상</button>
          <button id="search-button" class="btn mx-1">
            🔍 동영상 검색
          </button>
        </nav>
      </header>
      <main class="mt-10">
        <section id="video-list-wrapper" class="video-wrapper">
        </section>
      </main>
    </div>
    <div class="modal">
    </div>
    <div id="snackbar"></div>
  </div>`;
  }

  mount() {
    this.videoList = new VideoList($(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID));
    this.viewSearchModal = new VideoSearchModal(
      $(SELECTORS.SEARCH_MODAL.MODAL_CLASS)
    );
  }

  selectDOM() {
    this.$watchLaterButton = $(SELECTORS.MENU_BUTTON.WATCH_LATER_ID);
    this.$watchedButton = $(SELECTORS.MENU_BUTTON.WATCHED_ID);
    this.$searchButton = $(SELECTORS.MENU_BUTTON.SEARCH_ID);
  }

  bindEvent() {
    this.$watchLaterButton.addEventListener('click', () => {
      this.videoList.setFilter(TYPES.FILTER.WATCH_LATER);
    });

    this.$watchedButton.addEventListener('click', () => {
      this.videoList.setFilter(TYPES.FILTER.WATCHED);
    });

    this.$searchButton.addEventListener('click', () =>
      this.viewSearchModal.onModalShow()
    );
  }
}
