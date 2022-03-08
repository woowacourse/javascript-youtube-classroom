import { $ } from '../utils/dom';
import Search from './Search';

export default class Modal {
  constructor() {
    this.addSearchModalButtonClickEvent();
    this.addModalOuterClickEvent();
    new Search();
  }

  toggleShowSearchModal() {
    $('.modal-container').classList.toggle('hide');
  }

  addSearchModalButtonClickEvent() {
    $('#search-modal-button').addEventListener('click', () => {
      this.toggleShowSearchModal();
    });
  }

  addModalOuterClickEvent() {
    window.addEventListener('click', e => {
      e.target === $('.dimmer') ? this.toggleShowSearchModal() : false;
    });
  }
}
