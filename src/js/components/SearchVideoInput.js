import { $ } from '../util/index.js';

export class SearchVideoInput {
  constructor({ searchKeywordHistoryManager }) {
    this.$searchVideoForm = $('.js-search-video-form');
    this.$searchKeywordHistoryList = $('.js-search-keyword-history-list');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.searchKeywordHistoryManager.subscribe(this.render.bind(this));

    this.initEvent();
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
}
