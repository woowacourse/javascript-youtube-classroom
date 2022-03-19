import { $ } from '../util';

export default class SearchKeywordFormView {
  constructor({ searchVideoManager }) {
    this.searchVideoManager = searchVideoManager;
    $('#search-form').addEventListener('submit', this.onSubmitSearchForm);
  }

  onSubmitSearchForm = (e) => {
    e.preventDefault();
    const keyword = $('#search-input-keyword').value;
    this.searchVideoManager.searchWithKeyword(keyword);
  }
}
