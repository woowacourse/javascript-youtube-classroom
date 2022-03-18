import { $ } from '../utils/dom';
import { youtubeSearchForm } from './youtubeSearchForm';
import { youtubeSearchResult } from './youtubeSearchResult';

export default class YoutubeSearchModal {
  constructor() {
    this.addSearchModalButtonClickEvent();
    this.addModalCloseEvent();
    youtubeSearchForm.preventFormDeafultEvent();
    youtubeSearchForm.addSearchEvent();
    youtubeSearchResult.addSaveButtonClickEvent();
  }

  reset() {
    this.toggleShowSearchModal();
    youtubeSearchResult.resetVideoList();
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
