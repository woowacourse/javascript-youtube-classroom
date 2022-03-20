import { $ } from '../utils/dom';
import { videoSearchForm } from './videoSearchForm';
import { videoSearchResult } from './videoSearchReulst';

export default class VideoSearchModal {
  constructor() {
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$modalContainer = $('.modal-container');
    this.$searchModalButton = $('#search-modal-button');
    this.$dimmer = $('.dimmer');

    this.addSearchModalButtonClickEvent();
    this.addModalCloseEvent();
    videoSearchForm.preventFormDeafultEvent();
    videoSearchForm.addSearchEvent();
    videoSearchResult.addSaveButtonClickEvent();
  }

  reset() {
    this.toggleShowSearchModal();
    videoSearchResult.resetVideoList();
    this.$searchInputKeyword.value = '';
  }

  toggleShowSearchModal() {
    this.$modalContainer.classList.toggle('hide');
  }

  addSearchModalButtonClickEvent() {
    this.$searchModalButton.addEventListener('click', () => {
      this.toggleShowSearchModal();
      this.$searchInputKeyword.focus();
    });
  }

  addModalCloseEvent() {
    this.$dimmer.addEventListener('click', e => {
      this.reset();
    });
    this.$modalContainer.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.reset();
      }
    });
  }
}
