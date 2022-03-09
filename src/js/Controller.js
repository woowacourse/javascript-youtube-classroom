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

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.#scrollNextVideos();
          console.log('무한스크롤중');
        } else console.log('Not on the bottom');
      },
      {
        root: this.searchResultView.$videoList,
        threshold: 1.0,
      },
    );
  }

  #subscribeViewEvents() {
    on(this.searchInputView.$searchButton, '@search', this.#searchVideo.bind(this));
  }

  // 검색 버튼을 눌렀을 때
  async #searchVideo(event) {
    this.searchResultView.removeVideo();
    const { keyword } = event.detail;
    this.video.keyword = keyword;
    await this.video.fetchYoutubeApi(keyword);
    this.video.setVideoInfo();
    this.searchResultView.renderVideo(this.video.videoItems);
    this.startObserve();
  }

  // (이미 검색버튼을 눌러진 상태) 스크롤 내림으로써 발생하는 추가 fetch, render
  async #scrollNextVideos() {
    this.observer.unobserve(this.searchResultView.$videoList.lastElementChild);
    await this.video.fetchYoutubeApi(this.video.keyword, this.video.nextPageToken);
    this.video.setVideoInfo();
    this.searchResultView.renderVideo(this.video.videoItems);
    this.startObserve();
  }

  startObserve() {
    this.observer.observe(this.searchResultView.$videoList.lastElementChild);
  }
}
