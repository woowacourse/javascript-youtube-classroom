import { MAX_NUM_OF_SAVED_VIDEO } from '../constants/index.js';
import { $ } from '../util/index.js';

export class SearchVideoInput {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$searchVideoForm = $('.js-search-video-form');
    this.$searchInput = $('.js-search-input');
    this.$searchKeywordHistoryList = $('.js-search-keyword-history-list');
    this.$numOfSavedVideo = $('.js-num-of-saved-video');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.searchKeywordHistoryManager.subscribe(this.renderSearchKeywordHistory.bind(this));
    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe(this.renderNumOfSavedVideo.bind(this));

    this.initEvent();
    this.renderSearchKeywordHistory();
    this.renderNumOfSavedVideo();
  }

  initEvent() {
    this.$searchVideoForm.addEventListener('submit', this.handleSearchVideoSubmit.bind(this));
    this.$searchKeywordHistoryList.addEventListener('click', this.handleSearchKeyWordHistory.bind(this));
  }

  handleSearchVideoSubmit(event) {
    event.preventDefault();

    const searchInput = event.target.searchInput.value;
    this.searchKeywordHistoryManager.updateKeywordHistory(searchInput);
  }

  handleSearchKeyWordHistory({ target }) {
    if (target.classList.contains('chip')) {
      const keyword = target.innerText;

      this.$searchInput.value = keyword;
      this.searchKeywordHistoryManager.updateKeywordHistory(keyword);
    }
  }

  renderSearchKeywordHistory() {
    this.$searchKeywordHistoryList.innerHTML = this.searchKeywordHistoryManager
      .getSearchKeywordHistory()
      .map(keyword => `<li class="mr-2"><button type="button" class="chip">${keyword}</button></li>`)
      .join('');
  }

  renderNumOfSavedVideo() {
    this.$numOfSavedVideo.innerText = `${
      this.savedVideoManager.getSavedVideoIdList().length
    }/${MAX_NUM_OF_SAVED_VIDEO}`;
  }
}
