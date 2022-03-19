import { $ } from '../util';
import SearchKeywordFormView from './SearchKeywordFormView';
import SearchResultView from './SearchResultView';

export default class SearchModalView {
  constructor({ searchVideoManager, saveVideoManager }) {
    this.searchKeywordFormView = new SearchKeywordFormView({ searchVideoManager });
    this.searchResultView = new SearchResultView({ searchVideoManager, saveVideoManager });

    $('.dimmer').addEventListener('click', this.closeModal);
    window.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    if (e.key === 'Escape' && !$('#modal-container').classList.contains('hide')) {
      this.closeModal();
    }
  }

  closeModal = () => {
    $('#modal-container').classList.add('hide');
  }
}
