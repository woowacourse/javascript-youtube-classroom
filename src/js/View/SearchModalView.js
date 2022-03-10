import { $ } from '../util';
import SearchKeywordFormView from './SearchKeywordFormView';
import SearchResultView from './SearchResultView';

export default class SearchModalView {
  constructor() {
    this.searchKeywordFormView = new SearchKeywordFormView();
    this.searchResultView = new SearchResultView();

    this.bindEvents();
  }

  bindEvents() {
    $('.dimmer').addEventListener('click', this.closeModal);
  }

  closeModal() {
    $('#modal-container').classList.add('hide');
  }

  updateOnKeywordSearchLoading() {
    this.searchResultView.resetSearchResultVideoList();
    this.searchResultView.updateOnLoading();
  }

  updateOnScrollLoading() {
    this.searchResultView.updateOnLoading();
  }

  updateOnSearchDataReceived(videos) {
    this.searchResultView.updateOnSearchDataReceived(videos);
  }
}
