import { $ } from '../util';
import SearchKeywordFormView from './SearchKeywordFormView';
import SearchResultView from './SearchResultView';

export default class SearchModalView {
  constructor() {
    this.searchKeywordFormView = new SearchKeywordFormView();
    this.searchResultView = new SearchResultView();

    $('.dimmer').addEventListener('click', this.closeModal);
  }

  closeModal() {
    $('#modal-container').classList.add('hide');
  }
}
