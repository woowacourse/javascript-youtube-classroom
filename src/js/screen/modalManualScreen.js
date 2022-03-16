import { $ } from '../util/domHelper';

export default class ModalManualScreen {
  #searchModalButton = $('#search-modal-button');
  #dimmer = $('.dimmer');
  #modalContainer = $('.modal-container');

  constructor() {
    this.#searchModalButton.addEventListener('click', this.#handleOpenModal);
    this.#dimmer.addEventListener('click', this.#handleCloseModal);
  }

  #handleOpenModal = () => {
    this.#modalContainer.classList.remove('hide');
  };

  #handleCloseModal = (e) => {
    if (e.target.matches('#search-modal-button')) return;

    if (!e.target.closest('.search-modal')) {
      this.#modalContainer.classList.add('hide');
    }
  };
}
