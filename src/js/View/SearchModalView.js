import { $ } from '../util';
import SearchKeywordFormView from './SearchKeywordFormView';
import SearchResultView from './SearchResultView';

export default class SearchModalView {
  constructor() {
    this.searchKeywordFormView = new SearchKeywordFormView();
    this.searchResultView = new SearchResultView();

    $('.dimmer').addEventListener('click', this.closeModal);
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    if (e.key === 'Escape' && !$('#modal-container').classList.contains('hide')) {
      $('#modal-container').classList.add('hide');
    }
  }

  closeModal() {
    $('#modal-container').classList.add('hide');
  }
}
