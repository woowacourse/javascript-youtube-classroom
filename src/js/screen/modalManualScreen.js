import { $ } from '../util/domHelper';

export default class ModalManualScreen {
  constructor() {
    this.searchModalButton = $('#search-modal-button');
    this.dimmer = $('.dimmer');

    this.searchModalButton.addEventListener('click', this.handleOpenModal);
    this.dimmer.addEventListener('click', this.handleCloseModal);
    this.modalContainer = $('.modal-container');
  }

  handleOpenModal = () => {
    this.modalContainer.classList.remove('hide');
  };

  handleCloseModal = (e) => {
    if (e.target.matches('#search-modal-button')) return;

    if (!e.target.closest('.search-modal')) {
      this.modalContainer.classList.add('hide');
    }
  };
}
