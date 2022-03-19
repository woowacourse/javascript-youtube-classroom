import { on } from './utils/event.js';
import { checkAnswerYes, checkExceedLimit, checkVideoIsNone } from './utils/validator.js';

import AppView from './views/AppView.js';
import SearchInputView from './views/SearchInputView.js';
import SearchResultView from './views/SearchResultView.js';
import SearchCloseView from './views/SearchCloseView.js';

import VideoModel from './models/VideoModel.js';
import dummyObject from './dummy/dummyObject.js';

export default class Controller {
  constructor() {
    this.video = new VideoModel(dummyObject);
    this.appView = new AppView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.SearchCloseView = new SearchCloseView();

    this.video.savedVideoItems = this.video.getItemsLocalStorage();
    this.appView.renderSavedVideo(this.video.getItemsLocalStorage());
    this.#subscribeViewEvents();
  }

  #subscribeViewEvents() {
    on(this.appView.$willSeeWrapper, '@delete-video', this.#deleteVideo.bind(this));
    on(this.appView.$willSeeWrapper, '@check-saw-video', this.#checkSawVideo.bind(this));

    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));

    on(this.searchResultView.$searchTarget, '@scroll-bottom', this.#scrollNextVideos.bind(this));
    on(this.searchResultView.$searchTarget, '@save-video', this.#saveVideo.bind(this));

    on(this.SearchCloseView.$closeButton, '@close-modal', this.#closeModal.bind(this));
  }

  async #searchVideo(event) {
    this.searchResultView.hideNotFound();
    this.searchResultView.removeVideo();
    const { keyword } = event.detail;

    try {
      this.video.keyword = keyword;
    } catch (error) {
      alert(error.message);
      return;
    }

    this.searchResultView.showSkeleton();
    await this.video.fetchYoutubeApi(keyword);

    try {
      this.video.setVideoInfo();
    } catch (error) {
      this.searchResultView.removeVideo();
      this.searchResultView.showNotFound();
      return;
    }

    this.video.updateNewVideoItems();
    this.video.accumulateVideoItems();
    this.searchResultView.startObserve();
    this.searchResultView.renderVideo(this.video.newVideoItems);
  }

  async #scrollNextVideos() {
    this.searchResultView.stopObserve();
    try {
      checkVideoIsNone();
    } catch (error) {
      return;
    }
    this.searchResultView.showSkeleton();
    await this.video.fetchYoutubeApi(this.video.keyword, this.video.nextPageToken);

    try {
      this.video.setVideoInfo();
    } catch (error) {
      return;
    }
    this.video.updateNewVideoItems();
    this.video.accumulateVideoItems();
    this.searchResultView.startObserve();
    this.searchResultView.renderVideo(this.video.newVideoItems);
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

  #closeModal() {
    this.video.resetAllVideoItems();
    this.searchInputView.resetSearchInputKeyword();
    this.searchResultView.hideModal();
    this.searchResultView.removeVideo();
    this.appView.renderSavedVideo(this.video.getItemsLocalStorage());
  }

  #deleteVideo(event) {
    if (checkAnswerYes()) {
      this.video.deleteVideo(event.detail.deleteVideoId);
      this.appView.renderSavedVideo(this.video.getItemsLocalStorage());
    }
  }

  #checkSawVideo(event) {
    // savedVideoItems를 업데이트
    this.video.updateSawTrue(event.detail.sawVideoId);
    // localStorage에 업데이트
    this.video.updateItemsLocalStorage();

    // 다시 렌더링한다.
    this.appView.renderSavedVideo(this.video.getItemsLocalStorage());
  }
}
