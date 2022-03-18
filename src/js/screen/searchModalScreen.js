import SearchEngine from '../domain/searchEngine.js';

import SearchResultScreen from './searchResultScreen.js';

import { $ } from '../util/domHelper.js';

export default class SearchModalScreen {
  #searchModalButton;
  #modalContainer;
  #searchButton;
  #dimmer;
  #searchResultScreen;
  #searchEngine;
  #searchInputKeyword;

  constructor() {
    // element 초기화
    this.#dimmer = $('.dimmer');
    this.#modalContainer = $('.modal-container');
    this.#searchButton = $('#search-button');
    this.#searchModalButton = $('#search-modal-button');
    this.#searchInputKeyword = $('#search-input-keyword');

    // 인스턴스 생성
    this.#searchEngine = new SearchEngine();
    this.#searchResultScreen = new SearchResultScreen(this.#searchInputKeyword, this.#searchEngine);

    // 이벤트 핸들러 등록
    this.#searchModalButton.addEventListener('click', this.#handleOpenModal);
    this.#dimmer.addEventListener('click', this.#handleCloseModal);
    this.#searchButton.addEventListener('click', this.#handleSearchVideos.bind(this));
    this.#searchInputKeyword.addEventListener('keydown', this.#handleSearchVideos.bind(this));
  }

  #handleOpenModal = () => {
    this.#modalContainer.classList.remove('hide');
  };

  #handleCloseModal = () => {
    this.#modalContainer.classList.add('hide');
  };

  async #handleSearchVideos(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      this.#initSearchEnvironment();
      this.#searchResultScreen.renderSkeleton();

      const keyword = this.#searchInputKeyword.value;

      try {
        const videosData = await this.#searchEngine.searchKeyword(keyword);
        this.#searchResultScreen.renderSearchResult(videosData);
      } catch (error) {
        alert(error);
      }
    }
  }

  #initSearchEnvironment() {
    this.#searchEngine.resetPageToken();
    this.#searchResultScreen.init();
  }
}
