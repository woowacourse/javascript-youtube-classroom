import { $ } from '../util';

export default class SearchKeywordFormView {
  constructor({ searchVideoManager }) {
    this.searchVideoManager = searchVideoManager;
    
    this.initDOMs();
    this.bindEvents();
  }

  initDOMs() {
    this.$modalContainer = $('#modal-container');
    this.$searchForm = $('#search-form', this.$modalContainer);
    this.$searchKeywordInput = $('#search-input-keyword', this.$searchForm);
  }

  bindEvents() {
    this.$searchForm.addEventListener('submit', this.onSubmitSearchForm);
  }

  onSubmitSearchForm = (e) => {
    e.preventDefault();
    const keyword = this.$searchKeywordInput.value;
    this.searchVideoManager.searchWithKeyword(keyword);
  }
}
