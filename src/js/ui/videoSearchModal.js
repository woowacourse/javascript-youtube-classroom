import { $ } from '../utils/dom';
import { videoSearchForm } from './videoSearchForm';
import { videoSearchResult } from './videoSearchReulst';

export default class VideoSearchModal {
  constructor() {
    this.addSearchModalButtonClickEvent();
    this.addModalCloseEvent();
    videoSearchForm.preventFormDeafultEvent();
    videoSearchForm.addSearchEvent();
    videoSearchResult.addSaveButtonClickEvent();
  }

  reset() {
    this.toggleShowSearchModal();
    videoSearchResult.resetVideoList();
    $('#search-input-keyword').value = '';
  }

  toggleShowSearchModal() {
    $('.modal-container').classList.toggle('hide');
  }

  addSearchModalButtonClickEvent() {
    $('#search-modal-button').addEventListener('click', () => {
      this.toggleShowSearchModal();
      $('#search-input-keyword').focus();
    });
  }

  addModalCloseEvent() {
    $('.dimmer').addEventListener('click', e => {
      this.reset();
    });
    $('.modal-container').addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.reset();
      }
    });
  }
}
