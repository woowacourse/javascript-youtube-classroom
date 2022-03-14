import VideosScreen from './videos.js';

import { $ } from '../util/domHelper.js';
import { NO_RESULT_TEMPLATE, VIDEO_LIST_TEMPLATE } from '../util/template.js';
import { DELAY_MILISECOND_TIME } from '../util/constants.js';

export default class SearchResultScreen {
  #throttle;

  constructor(searchInputKeyword, searchEngine) {
    this.searchResult = $('.search-result');
    this.searchInputKeyword = searchInputKeyword;
    this.searchEngine = searchEngine;

    this.videosScreen = new VideosScreen(this.searchResult);
  }

  init() {
    this.searchResult.removeChild(this.searchResult.lastElementChild);
    this.searchResult.classList.remove('search-result--no-result');
    this.searchResult.insertAdjacentHTML('beforeend', VIDEO_LIST_TEMPLATE);
  }

  renderSearchResult(data) {
    if (data === null) {
      this.searchResult.removeChild(this.searchResult.lastElementChild);
      this.searchResult.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
      this.searchResult.classList.add('search-result--no-result');
      return;
    }

    this.videosScreen.render(data);
    this.bindScrollEvent();
  }

  bindScrollEvent() {
    this.videoList = $('.video-list');
    this.videoList.addEventListener('scroll', this.handleScroll.bind(this));
  }

  async handleScroll(e) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    if (!this.#throttle && scrollHeight <= scrollTop + clientHeight) {
      this.#throttle = setTimeout(async () => {
        this.#throttle = null;
        this.renderSkeleton();

        const keyword = this.searchInputKeyword.value;
        const data = await this.searchEngine.searchKeyword(keyword);

        this.renderAdditionalVideos(data);
      }, DELAY_MILISECOND_TIME);
    }
  }

  renderAdditionalVideos(data) {
    if (data === null) {
      this.searchResult.removeChild(this.searchResult.lastElementChild);
      return;
    }

    this.videosScreen.render(data);
  }

  renderSkeleton() {
    this.videosScreen.renderSkeleton();
  }
}
