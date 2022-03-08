import { $ } from '../utils/dom';

export default class Modal {
  constructor() {
    this.addSearchModalButtonClickEvent();
    this.addModalOuterClickEvent();
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
