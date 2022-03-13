import AppView from './views/AppView.js';
import SearchInputView from './views/SearchInputView.js';
import SearchResultView from './views/SearchResultView.js';

import dummyObject from './dummy/dummyObject.js';
import Video from './models/Video.js';
import { on } from './utils/event.js';
import VIDEO from '../constants/video.js';
import { checkExceedLimit, checkVideoIsNone } from './utils/validator.js';

export default class Controller {
  constructor() {
    this.video = new Video(dummyObject);
    this.video.savedVideoItems = this.video.getItemsLocalStorage();
    this.appView = new AppView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.#subscribeViewEvents();
  }

  #subscribeViewEvents() {
    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));
    on(this.searchResultView.$searchTarget, '@scroll-bottom', this.#scrollNextVideos.bind(this));
    on(this.searchResultView.$searchTarget, '@save-video', this.#saveVideo.bind(this));
  }

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
    await this.video.fetchYoutubeApi(keyword);

    try {
      this.video.setVideoInfo();
    } catch (error) {
      this.searchResultView.removeVideo();
      this.searchResultView.showNotFound();
      return;
    }

    this.video.accumulateVideoItems();
    this.video.updateNewVideoItems();
    this.searchResultView.hideNotFound();
    this.searchResultView.renderVideo(this.video.newVideoItems);
    this.searchResultView.startObserve();
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
    this.video.accumulateVideoItems();
    this.video.updateNewVideoItems();
    this.searchResultView.renderVideo(this.video.newVideoItems);
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
}
