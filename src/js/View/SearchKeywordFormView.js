import { EVENT } from '../constants';
import { $, event } from '../util';

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
    event.dispatch(EVENT.SEARCH_WITH_NEW_KEYWORD, { keyword });
  }
}
