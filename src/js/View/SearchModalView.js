import { $ } from '../util';
import SearchKeywordFormView from './SearchKeywordFormView';
import SearchResultView from './SearchResultView';

export default class SearchModalView {
  constructor({ searchVideoManager, saveVideoManager }) {
    this.searchKeywordFormView = new SearchKeywordFormView({ searchVideoManager });
    this.searchResultView = new SearchResultView({ searchVideoManager, saveVideoManager });

    this.initDOMs();
    this.bindEvents();
  }

  initDOMs() {
    this.$modalContainer = $('#modal-container');
    this.$dimmer = $('.dimmer', this.$modalContainer);
  }

  bindEvents() {
    this.$dimmer.addEventListener('click', this.closeModal);
    window.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    if (e.key === 'Escape' && !this.$modalContainer.classList.contains('hide')) {
      this.closeModal();
    }
  }

  closeModal = () => {
    this.$modalContainer.classList.add('hide');
  }
}
