import { on } from './utils/event.js';
import { checkExceedLimit, checkVideoIsNone } from './utils/validator.js';

import AppView from './views/AppView.js';
import SearchInputView from './views/SearchInputView.js';
import SearchResultView from './views/SearchResultView.js';
import SearchCloseView from './views/SearchCloseView.js';

import VideoModel from './models/VideoModel.js';
import dummyObject from './dummy/dummyObject.js';

export default class Controller {
  constructor() {
    this.video = new VideoModel(dummyObject);
    this.video.savedVideoItems = this.video.getItemsLocalStorage();
    this.appView = new AppView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.SearchCloseView = new SearchCloseView();
    this.#subscribeViewEvents();
  }

  #subscribeViewEvents() {
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
    // 볼 영상에 렌더링 (get한 것을 view에 넘겨줘)
    this.appView.renderWillSeeVideo(this.video.getItemsLocalStorage());
  }

  #closeModal() {
    this.searchInputView.resetSearchInputKeyword();
    this.searchResultView.hideModal();
    this.searchResultView.removeVideo();
  }
}
