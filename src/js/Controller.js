import dummyObject from './dummy/dummyObject.js';
import Video from './models/Video.js';
import { $ } from './utils/dom.js';
import { on } from './utils/event.js';

import AppView from './views/AppView.js';
import SearchInputView from './views/SearchInputView.js';
import SearchResultView from './views/SearchResultView.js';

export default class Controller {
  constructor() {
    this.video = new Video(dummyObject);
    this.appView = new AppView();
    this.searchInputView = new SearchInputView();
    this.searchResultView = new SearchResultView();
    this.#subscribeViewEvents();
  }

  #subscribeViewEvents() {
    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));
  }

  async #searchVideo(event) {
    this.searchResultView.removeVideo();
    const { keyword } = event.detail;
    this.searchResultView.insertSkeleton();
    this.searchResultView.showSkeleton();
    await this.video.fetchYoutubeApi(keyword);
    this.video.setVideoInfo();
    this.searchResultView.hideSkeleton();
    this.searchResultView.renderVideo(this.video.videoItems);

    // console.log(this.video.videoItems, this.video.nextPageToken);
  }
}
