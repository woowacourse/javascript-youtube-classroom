import SearchedVideosScreen from './searchedVideosScreen.js';

import { $ } from '../util/domHelper.js';
import { NO_RESULT_TEMPLATE, VIDEO_LIST_TEMPLATE } from '../util/template.js';
import { DELAY_MILISECOND_TIME } from '../util/constants.js';

export default class SearchResultScreen {
  #throttle;
  #searchInputKeyword;
  #searchEngine;
  #searchedVideosScreen;
  #videoList;
  #searchResult;

  constructor(searchInputKeyword, searchEngine) {
    this.#searchResult = $('.search-result');
    this.#searchInputKeyword = searchInputKeyword;
    this.#searchEngine = searchEngine;

    this.#searchedVideosScreen = new SearchedVideosScreen(this.#searchResult);
  }

  init() {
    this.#searchResult.removeChild(this.#searchResult.lastElementChild);
    this.#searchResult.classList.remove('search-result--no-result');
    this.#searchResult.insertAdjacentHTML('beforeend', VIDEO_LIST_TEMPLATE);
  }

  renderSearchResult(videosData) {
    if (videosData === null) {
      this.#searchResult.removeChild(this.#searchResult.lastElementChild);
      this.#searchResult.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
      this.#searchResult.classList.add('search-result--no-result');
      return;
    }

    this.#searchedVideosScreen.allocate(videosData);
    this.#bindScrollEvent();
  }

  #bindScrollEvent() {
    this.#videoList = $('.video-list');
    this.#videoList.addEventListener('scroll', this.#handleScroll.bind(this));
  }

  async #handleScroll(e) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    if (!this.#throttle && scrollHeight <= scrollTop + clientHeight) {
      this.#throttle = setTimeout(async () => {
        this.#throttle = null;
        this.renderSkeleton();

        const keyword = this.#searchInputKeyword.value;
        const videosData = await this.#searchEngine.searchKeyword(keyword);

        this.#renderAdditionalVideos(videosData);
      }, DELAY_MILISECOND_TIME);
    }
  }

  #renderAdditionalVideos(videosData) {
    if (videosData === null) {
      this.#searchResult.removeChild(this.#searchResult.lastElementChild);
      return;
    }

    this.#searchedVideosScreen.allocate(videosData);
  }

  renderSkeleton() {
    this.#searchedVideosScreen.renderSkeleton();
  }
}
