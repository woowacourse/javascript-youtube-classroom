import { $ } from '../utils/dom';
import { videoSearchForm } from './videoSearchForm';
import { videoSearchResult } from './videoSearchResult';

export default class VideoSearchModal {
  constructor() {
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$modalContainer = $('.modal-container');
    this.$searchModalButton = $('#search-modal-button');
    this.$dimmer = $('.dimmer');

    this.$searchModalButton.addEventListener('click', this.handleSearchModalButtonClick);
    this.$dimmer.addEventListener('click', this.reset);
    this.$modalContainer.addEventListener('keydown', this.handleESCKeyDown);
    videoSearchForm.preventFormDeafultEvent();
    videoSearchForm.addSearchEvent();
    videoSearchResult.addSaveButtonClickEvent();
  }

  toggleShowSearchModal() {
    this.$modalContainer.classList.toggle('hide');
  }

  handleSearchModalButtonClick = () => {
    this.toggleShowSearchModal();
    this.$searchInputKeyword.focus();
  };

  reset = () => {
    this.toggleShowSearchModal();
    videoSearchResult.resetVideoList();
    this.$searchInputKeyword.value = '';
  };

  handleESCKeyDown = e => {
    if (e.key === 'Escape') this.reset(e);
  };
}
