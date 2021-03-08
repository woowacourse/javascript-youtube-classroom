import YoutubeAPIManager from '../model/YoutubeAPIManager.js';
import VideoSearchModal from './videoSearchModal/VideoSearchModal.js';
import VideoList from './videoList/VideoList.js';
import { $, localStorageSetItem, localStorageGetItem } from '../utils/utils.js';
import { LOCALSTORAGE_KEYS } from '../constants/constants.js';

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
        <section class="video-wrapper">
        </section>
      </main>
    </div>
    <div class="modal">
    </div>
  </div>`;
  }

  mount() {
    this.videoList = new VideoList($('.video-wrapper'));
    this.viewSearchModal = new VideoSearchModal($('.modal'));
  }

  selectDOM() {
    this.$searchButton = $('#search-button');
    this.$watchLaterButton = $('#watch-later-button');
    this.$watchedButton = $('#watched-button');
  }

  bindEvent() {
    this.$searchButton.addEventListener('click', () =>
      this.viewSearchModal.onModalShow()
    );

    this.$watchLaterButton.addEventListener('click', () => {
      this.videoList.render();
    });

    this.$watchedButton.addEventListener('click', () => {
      this.videoList.render();
    });
  }
}
