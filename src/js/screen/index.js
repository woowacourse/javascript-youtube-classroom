import SearchEngine from '../domain/searchEngine.js';
import StorageEngine from '../domain/storageEngine.js';

import { $ } from '../util/domHelper.js';
import { NO_RESULT_TEMPLATE, videoItemsTemplate, videoListTemplate } from '../util/template.js';
import { preprocessDate } from '../util/common.js';

export default class ScreenManager {
  #throttle;

  constructor() {
    // 인스턴스 생성
    this.searchEngine = new SearchEngine();
    this.storageEngine = new StorageEngine();

    // element 초기화
    this.searchModalButton = $('#search-modal-button');
    this.modalContainer = $('.modal-container');
    this.searchButton = $('#search-button');
    this.searchInputKeyword = $('#search-input-keyword');
    this.searchResult = $('.search-result');

    // 이벤트 핸들러 등록
    this.searchModalButton.addEventListener('click', this.handleOpenModal.bind(this));
    document.addEventListener('click', this.handleCloseModal.bind(this));
    this.searchButton.addEventListener('click', this.handleSearchVideos.bind(this));
    this.searchInputKeyword.addEventListener('keydown', this.handleSearchVideos.bind(this));
    this.searchResult.addEventListener('click', this.handleSaveVideo.bind(this));
  }

  handleOpenModal() {
    this.modalContainer.classList.remove('hide');
  }

  handleCloseModal(e) {
    if (e.target.matches('#search-modal-button')) return;

    if (!e.target.closest('.search-modal')) {
      this.modalContainer.classList.add('hide');
    }
  }

  async handleSearchVideos(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      this.initSearchEnvironment();
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
  }

  renderSearchResult(data) {
    if (data === null) {
      this.searchResult.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
      this.searchResult.classList.add('search-result--no-result');
      return;
    }

    const preprocessedData = ScreenManager.preprocessData(data);
    this.searchResult.insertAdjacentHTML('beforeend', videoListTemplate(preprocessedData));
    this.bindScrollEvent();
  }

  bindScrollEvent() {
    this.videoList = $('.video-list');
    this.videoList.addEventListener('scroll', this.handleScroll.bind(this));
  }

  async handleScroll(e) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    if (!this.#throttle && scrollHeight === scrollTop + clientHeight) {
      this.#throttle = setTimeout(async () => {
        this.#throttle = null;
        const keyword = this.searchInputKeyword.value;
        const data = await this.searchEngine.searchKeyword(keyword);

        this.renderAdditionalVideos(data);
      }, 100);
    }
  }

  renderAdditionalVideos(data) {
    if (data === null) return;

    const preprocessedData = ScreenManager.preprocessData(data);
    this.videoList.insertAdjacentHTML('beforeend', videoItemsTemplate(preprocessedData));
  }

  static preprocessData(data) {
    return data.map((datum) => {
      const thumbnails = datum.snippet.thumbnails.high.url;
      const { title, channelTitle, publishTime } = datum.snippet;
      const { videoId } = datum.id;

      return {
        thumbnails,
        title,
        channelTitle,
        publishTime: preprocessDate(publishTime),
        videoId,
      };
    });
  }

  handleSaveVideo(e) {
    if (e.target.classList.contains('video-item__save-button')) {
      const { videoId } = e.target.closest('.video-item').dataset;

      this.storageEngine.saveVideo(videoId);
      e.target.classList.add('hide');
    }
  }
}
