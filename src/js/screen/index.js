import SearchEngine from '../domain/searchEngine.js';

import Videos from './videos.js';

import { $ } from '../util/domHelper.js';
import { NO_RESULT_TEMPLATE, VIDEO_LIST_TEMPLATE } from '../util/template.js';
import { DELAY_MILISECOND_TIME } from '../util/constants.js';

export default class ScreenManager {
  #throttle;

  constructor() {
    // element 초기화
    this.searchModalButton = $('#search-modal-button');
    this.modalContainer = $('.modal-container');
    this.searchButton = $('#search-button');
    this.searchInputKeyword = $('#search-input-keyword');
    this.searchResult = $('.search-result');
    this.dimmer = $('.dimmer');

    // 인스턴스 생성
    this.searchEngine = new SearchEngine();
    this.videos = new Videos(this.searchResult);

    // 이벤트 핸들러 등록
    this.searchModalButton.addEventListener('click', this.handleOpenModal.bind(this));
    this.dimmer.addEventListener('click', this.handleCloseModal.bind(this));
    this.searchButton.addEventListener('click', this.handleSearchVideos.bind(this));
    this.searchInputKeyword.addEventListener('keydown', this.handleSearchVideos.bind(this));
  }

  handleOpenModal() {
    this.modalContainer.classList.remove('hide');
  }

  handleCloseModal() {
    this.modalContainer.classList.add('hide');
  }

  async handleSearchVideos(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      this.initSearchEnvironment();
      this.videos.renderSkeleton();

      const keyword = this.searchInputKeyword.value;

      try {
        const data = await this.searchEngine.searchKeyword(keyword);
        this.renderSearchResult(data);
      } catch (error) {
        alert(error);
      }
    }
  }

  initSearchEnvironment() {
    this.searchEngine.resetPageToken();
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

    this.videos.render(data);
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
        this.videos.renderSkeleton();

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

    this.videos.render(data);
  }
}
