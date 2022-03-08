import { $ } from '../utils/dom';

export default class Modal {
  constructor() {
    this.modal = $('.modal-container');
    this.addSearchModalButtonClickEvent();
  }

  openSearchModal() {
    this.modal.classList.toggle('hide');
  }

  addSearchModalButtonClickEvent() {
    $('#search-modal-button').addEventListener('click', () => {
      this.openSearchModal();
    });
  }
}
