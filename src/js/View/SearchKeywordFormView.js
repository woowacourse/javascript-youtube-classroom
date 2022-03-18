import { EVENT } from '../constants';
import { $ } from '../util';
import { dispatch } from '../util/event';

export default class SearchKeywordFormView {
  constructor() {
    $('#search-form').addEventListener('submit', this.onSubmitSearchForm.bind(this));
  }

  onSubmitSearchForm(e) {
    e.preventDefault();
    const keyword = $('#search-input-keyword').value;
    dispatch(EVENT.SEARCH_WITH_NEW_KEYWORD, { keyword });
  }
}
