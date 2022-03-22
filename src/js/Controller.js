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
    this.videoModel = new VideoModel(dummyObject);
    this.appView = new AppView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.searchCloseView = new SearchCloseView();

    this.videoModel.savedVideoItems = this.videoModel.getItemsLocalStorage();
    this.appView.renderSavedVideo(this.videoModel.getItemsLocalStorage());
    this.#subscribeViewEvents();
  }

  #subscribeViewEvents() {
    on(this.appView.$willSeeWrapper, '@delete-video', this.#deleteVideo.bind(this));
    on(this.appView.$willSeeWrapper, '@check-saw-video', this.#checkSawVideo.bind(this));

    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));

    on(this.searchResultView.$searchTarget, '@scroll-bottom', this.#scrollNextVideos.bind(this));
    on(this.searchResultView.$searchTarget, '@save-video', this.#saveVideo.bind(this));

    on(this.searchCloseView.$closeButton, '@close-modal', this.#closeModal.bind(this));
  }

  async #searchVideo(event) {
    this.searchResultView.hideNotFound();
    this.searchResultView.removeVideo();
    const { keyword } = event.detail;

    try {
      this.videoModel.keyword = keyword;
    } catch (error) {
      alert(error.message);
      return;
    }

    this.searchResultView.showSkeleton();
    await this.videoModel.fetchYoutubeApi(keyword);

    try {
      this.videoModel.setVideoInfo();
    } catch {
      this.searchResultView.removeVideo();
      this.searchResultView.showNotFound();
      return;
    }

    this.videoModel.updateNewVideoItems();
    this.videoModel.accumulateVideoItems();
    this.searchResultView.startObserve();
    this.searchResultView.renderVideo(this.videoModel.newVideoItems);
  }

  async #scrollNextVideos() {
    this.searchResultView.stopObserve();
    try {
      checkVideoIsNone();
    } catch (error) {
      return;
    }
    this.searchResultView.showSkeleton();
    await this.videoModel.fetchYoutubeApi(this.videoModel.keyword, this.videoModel.nextPageToken);

    try {
      this.videoModel.setVideoInfo();
    } catch (error) {
      return;
    }
    this.videoModel.updateNewVideoItems();
    this.videoModel.accumulateVideoItems();
    this.searchResultView.startObserve();
    this.searchResultView.renderVideo(this.videoModel.newVideoItems);
  }

  #saveVideo(event) {
    try {
      checkExceedLimit(this.videoModel.savedVideoItems);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.searchResultView.changeSaveButtonStyle(event.detail.buttonElement);
    const { savedId } = event.detail;
    this.videoModel.setItemsLocalStorage(savedId);
  }

  #closeModal() {
    this.videoModel.resetAllVideoItems();
    this.searchInputView.resetSearchInputKeyword();
    this.searchResultView.hideModal();
    this.searchResultView.removeVideo();
    this.appView.renderSavedVideo(this.videoModel.getItemsLocalStorage());
  }

  #deleteVideo(event) {
    if (checkAnswerYes()) {
      this.videoModel.deleteVideo(event.detail.deleteVideoId);
      this.videoModel.updateItemsLocalStorage();
      this.appView.renderSavedVideo(this.videoModel.getItemsLocalStorage());
    }
  }

  #checkSawVideo(event) {
    this.videoModel.updateSawAttribute(event.detail.sawVideoId);
    this.videoModel.updateItemsLocalStorage();
    this.appView.renderSavedVideo(this.videoModel.getItemsLocalStorage());
  }
}
