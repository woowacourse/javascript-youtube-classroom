import { $, getSearchVideoByKeyword } from '../util/index.js';
import { SearchKeywordHistoryManager } from '../model/index.js';

export class SearchVideoInput {
  constructor() {
    this.$searchVideoForm = $('.js-search-video-form');
    this.$searchKeywordHistoryList = $('.js-search-keyword-history-list');
    this.searchKeywordHistoryManager = new SearchKeywordHistoryManager();
    this.searchKeywordHistoryManager.subscribe(this.render.bind(this));
    this.nextPageToken = '';
    this.initEvent();
  }

  initEvent() {
    this.$searchVideoForm.addEventListener('submit', this.handleSearchVideoSubmit.bind(this));
  }

  async handleSearchVideoSubmit(event) {
    event.preventDefault();
    const searchInput = event.target.searchInput.value;
    const resultData = await getSearchVideoByKeyword(searchInput);
    this.setState({ nextPageToken: resultData.nextPageToken });
    this.searchKeywordHistoryManager.updateKeywordHistory(searchInput);
  }

  setState({ nextPageToken }) {
    this.nextPageToken = nextPageToken;
  }

  render() {
    this.$searchKeywordHistoryList.innerHTML = this.searchKeywordHistoryManager.searchKeywordHistory
      .map(keyword => `<li class="mr-2"><a class="chip">${keyword}</a></li>`)
      .join('');
  }
}
