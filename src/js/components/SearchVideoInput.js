import { MAX_NUM_OF_SAVED_VIDEO } from '../constants/index.js';
import { $ } from '../util/index.js';

export class SearchVideoInput {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$searchVideoForm = $('.js-search-video-form');
    this.$searchKeywordHistoryList = $('.js-search-keyword-history-list');
    this.$numOfSavedVideo = $('.js-num-of-saved-video');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.searchKeywordHistoryManager.subscribe(this.render.bind(this));
    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe(this.renderNumOfSavedVideo.bind(this));

    this.initEvent();
    this.renderNumOfSavedVideo();
  }

  initEvent() {
    this.$searchVideoForm.addEventListener('submit', this.handleSearchVideoSubmit.bind(this));
  }

  handleSearchVideoSubmit(event) {
    event.preventDefault();

    const searchInput = event.target.searchInput.value;
    this.searchKeywordHistoryManager.updateKeywordHistory(searchInput);
  }

  render() {
    this.$searchKeywordHistoryList.innerHTML = this.searchKeywordHistoryManager
      .getSearchKeywordHistory()
      .map(keyword => `<li class="mr-2"><a class="chip">${keyword}</a></li>`)
      .join('');
  }

  renderNumOfSavedVideo() {
    this.$numOfSavedVideo.innerText = ` ${
      this.savedVideoManager.getSavedVideoIdList().length
    }/${MAX_NUM_OF_SAVED_VIDEO}`;
  }
}
