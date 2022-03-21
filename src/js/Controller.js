import MainView from './views/MainView.js';
import TabView from './views/TabView.js';
import SearchModalView from './views/SearchModalView.js';
import SearchInputView from './views/SearchInputView.js';
import SearchResultView from './views/SearchResultView.js';
import Video from './models/Video.js';
import { on } from './utils/event.js';
import VIDEO from '../constants/video.js';
import { checkExceedLimit } from './utils/validator.js';
import { fetchYoutubeApi } from './utils/fetch.js';
import SUCCESS_MESSAGE from '../constants/successMessages.js';

export default class Controller {
  constructor() {
    this.video = new Video();
    this.mainView = new MainView();
    this.tabView = new TabView();
    this.searchModalView = new SearchModalView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.#subscribeViewEvents();
    this.#renderUnwatchedTab();
  }

  #subscribeViewEvents() {
    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));
    on(this.searchResultView.$searchTarget, '@scroll-bottom', this.#scrollNextVideos.bind(this));
    on(this.searchResultView.$searchTarget, '@save-video', this.#saveVideo.bind(this));
    on(this.tabView.$unwatchedButton, '@show-unwatched-tab', this.#renderUnwatchedTab.bind(this));
    on(this.tabView.$watchedButton, '@show-watched-tab', this.#renderWatchedTab.bind(this));
    on(this.tabView.$unwatchedTab, '@check-watched', this.#checkWatchedVideo);
    on(this.tabView.$watchedTab, '@check-unwatched', this.#checkUnwatchedVideo.bind(this));
    on(this.tabView.$unwatchedTab, '@check-delete', this.#checkDeleteVideo.bind(this));
    on(this.tabView.$watchedTab, '@check-delete', this.#checkDeleteVideo.bind(this));
  }

  // 검색 버튼을 눌렀을 때
  async #searchVideo(event) {
    this.searchResultView.removeVideo();
    const { keyword } = event.detail;

    try {
      this.video.keyword = keyword;
    } catch (error) {
      this.mainView.toastNotification('error', error.message);
      return;
    }

    this.searchResultView.showSkeleton();
    const fetchedVideos = await fetchYoutubeApi(keyword);

    try {
      this.video.setVideoInfo(fetchedVideos);
    } catch (error) {
      this.searchResultView.removeVideo();
      this.searchResultView.showNotFound();
      this.mainView.toastNotification('error', error.message);
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

  #saveKeyword(keyword) {
    try {
      this.video.keyword = keyword;
    } catch (error) {
      this.mainView.toastNotification('error', error.message);
    }
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
      this.mainView.toastNotification('error', error.message);
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
      this.mainView.toastNotification('error', error.message);
      return;
    }
    this.searchResultView.changeSaveButtonStyle(event.detail.buttonElement);
    const { savedId } = event.detail;
    this.video.setItemsLocalStorage(savedId);
    this.mainView.toastNotification('success', SUCCESS_MESSAGE.SAVED);
  }

  #renderUnwatchedTab() {
    const unwatchedVideoItems = this.video.savedVideoItems.filter((item) => !item.watched);

    this.tabView.renderUnwatchedVideoItems(unwatchedVideoItems);
    this.tabView.showUnwatchedTab();
  }

  #renderWatchedTab() {
    const watchedVideoItems = this.video.savedVideoItems.filter((item) => item.watched);

    this.tabView.renderWatchedVideoItems(watchedVideoItems, this.tabView.$watchedTab);
    this.tabView.showWatchedTab();
  }

  #checkWatchedVideo = (event) => {
    const watchedVideoId = event.detail.videoId;
    this.video.setWatchedVideoItem(watchedVideoId);
    this.tabView.removeVideo(watchedVideoId);
    this.mainView.toastNotification('success', SUCCESS_MESSAGE.MOVED_TO_WATCHED);
  };

  #checkUnwatchedVideo(event) {
    const unwatchedVideoId = event.detail.videoId;
    this.video.setUnwatchedVideoItem(unwatchedVideoId);
    this.tabView.removeVideo(unwatchedVideoId);
    this.mainView.toastNotification('success', SUCCESS_MESSAGE.MOVED_TO_UNWATCHED);
  }

  #checkDeleteVideo(event) {
    const { videoId } = event.detail;
    const title = this.video.getVideoTitleBy(videoId);
    this.tabView.confirmDelete(videoId, title);
    this.tabView.$savedListContainer.addEventListener('@delete-video', this.#deleteVideo, { once: true });
  }

  #deleteVideo = (event) => {
    const deletedVideoId = event.detail.videoId;
    this.video.setDeletedVideoItem(deletedVideoId);
    this.tabView.removeVideo(deletedVideoId);
    this.tabView.hideConfirmModal();
    this.mainView.toastNotification('success', SUCCESS_MESSAGE.DELETED);
  };
}
