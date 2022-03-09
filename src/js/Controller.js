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
    const { keyword } = event.detail;
    console.log(this.video.fetchedVideos);
    await this.video.fetchYoutubeApi(keyword);
  }
}
