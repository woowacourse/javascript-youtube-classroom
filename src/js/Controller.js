import MainView from './views/MainView.js';
import SearchInputView from './views/SearchInputView.js';
import SearchResultView from './views/SearchResultView.js';

import dummyObject from './dummy/dummyObject.js';
import Video from './models/Video.js';
import { on } from './utils/event.js';
import VIDEO from '../constants/video.js';
import { checkExceedLimit } from './utils/validator.js';
import { fetchYoutubeApi } from './utils/fetch.js';
import { $, $$ } from './utils/dom.js';

export default class Controller {
  constructor() {
    this.video = new Video(dummyObject);
    this.video.savedVideoItems = this.video.getItemsLocalStorage();
    this.mainView = new MainView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.#subscribeViewEvents();
    this.#renderUnwatchedTab();
  }

  #subscribeViewEvents() {
    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));
    on(this.searchResultView.$searchTarget, '@scroll-bottom', this.#scrollNextVideos.bind(this));
    on(this.searchResultView.$searchTarget, '@save-video', this.#saveVideo.bind(this));
    on(this.mainView.$unwatchedButton, '@show-unwatched-tab', this.#renderUnwatchedTab.bind(this));
    on(this.mainView.$watchedButton, '@show-watched-tab', this.#renderWatchedTab.bind(this));
    on(this.mainView.$unwatchedTab, '@check-watched', this.#checkWatchedVideo.bind(this));
    on(this.mainView.$watchedTab, '@check-unwatched', this.#checkUnwatchedVideo.bind(this));
    on(this.mainView.$unwatchedTab, '@check-delete', this.#checkDeleteVideo.bind(this));
    on(this.mainView.$watchedTab, '@check-delete', this.#checkDeleteVideo.bind(this));
  }

  // 검색 버튼을 눌렀을 때
  async #searchVideo(event) {
    this.searchResultView.removeVideo();
    const { keyword } = event.detail;

    try {
      this.video.keyword = keyword;
    } catch (error) {
      alert(error.message);
      return;
    }

    this.searchResultView.showSkeleton();
    const fetchedVideos = await fetchYoutubeApi(keyword);

    try {
      this.video.setVideoInfo(fetchedVideos);
    } catch (error) {
      this.searchResultView.removeVideo();
      this.searchResultView.showNotFound();
      return;
    }

    this.video.accumulateVideoItems();
    this.video.updateNewVideoItems();
    this.searchResultView.hideNotFound();

    try {
      this.searchResultView.renderVideo(this.video.newVideoItems);
    } catch (error) {
      this.searchResultView.hideSkeleton();
    }
    this.searchResultView.startObserve();
  }

  // (이미 검색버튼을 눌러진 상태) 스크롤 내림으로써 발생하는 추가 fetch, render
  async #scrollNextVideos() {
    this.searchResultView.stopObserve();
    this.searchResultView.showSkeleton();

    const fetchedVideos = await fetchYoutubeApi(this.video.keyword, this.video.nextPageToken);

    try {
      this.video.setVideoInfo(fetchedVideos);
    } catch (error) {
      this.searchResultView.removeVideo();
      alert(error.message);
      return;
    }

    this.video.accumulateVideoItems();
    this.video.updateNewVideoItems();

    if (this.video.newVideoItems.length < VIDEO.MINIMUM_FETCHED_VIDEO_COUNT) {
      return;
    }

    try {
      this.searchResultView.renderVideo(this.video.newVideoItems);
    } catch (error) {
      this.searchResultView.hideSkeleton();
    }
    this.searchResultView.startObserve();
  }

  #saveVideo(event) {
    try {
      checkExceedLimit(this.video.savedVideoItems);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.searchResultView.changeSaveButtonStyle(event.detail.buttonElement);
    const { savedId } = event.detail;
    this.video.setItemsLocalStorage(savedId);
  }

  #renderUnwatchedTab() {
    const unwatchedVideoItems = this.video.savedVideoItems.filter((item) => item.watched === false);

    this.mainView.renderUnwatchedVideoItems(unwatchedVideoItems);
    this.mainView.showUnwatchedTab();
  }

  #renderWatchedTab() {
    const watchedVideoItems = this.video.savedVideoItems.filter((item) => item.watched === true);

    this.mainView.renderWatchedVideoItems(watchedVideoItems, this.mainView.$watchedTab);
    this.mainView.showWatchedTab();
  }

  #checkWatchedVideo(event) {
    const watchedVideoId = event.detail.videoId;
    this.video.setWatchedVideoItem(watchedVideoId);
    this.mainView.removeVideo(watchedVideoId);
  }

  #checkUnwatchedVideo(event) {
    const unwatchedVideoId = event.detail.videoId;
    this.video.setUnwatchedVideoItem(unwatchedVideoId);
    this.mainView.removeVideo(unwatchedVideoId);
  }

  #checkDeleteVideo(event) {
    const deletedVideoId = event.detail.videoId;
    this.video.setDeletedVideoItem(deletedVideoId);
    this.mainView.removeVideo(deletedVideoId);
  }
}
