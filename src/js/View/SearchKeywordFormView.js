import { $ } from '../util';

export default class SearchKeywordFormView {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    $('#search-form').addEventListener('submit', this.onSubmitSearchForm.bind(this));
  }

  onSubmitSearchForm(e) {
    e.preventDefault();
    const keyword = $('#search-input-keyword').value;
    const searchKeywordEvent = new CustomEvent('searchKeyword', {
      detail: { keyword },
    });
    $('#search-modal').dispatchEvent(searchKeywordEvent);
  }
}
