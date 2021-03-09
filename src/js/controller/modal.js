import { $ } from '../utils/util.js';

class ModalController {
  #storage;
  #savedView;

  constructor(savedView, storage) {
    this.#savedView = savedView;
    this.#storage = storage;
  }
  init = () => {
    this.handleModalOpen();
    this.handleModalClose();
  };

  onModalShow = () => {
    const $modal = $('.modal');
    $modal.classList.add('open');
  };

  onModalClose = () => {
    const $modal = $('.modal');
    $modal.classList.remove('open');
  };

  handleModalOpen = () => {
    const $searchModalButton = $('#search-modal-button');
    $searchModalButton.addEventListener('click', () => this.onModalShow());
  };

  handleModalClose = () => {
    const $modal = $('.modal');
    $modal.addEventListener('click', event => {
      if (
        event.target.querySelector('.modal-inner') ||
        event.target.closest('.modal-close')
      ) {
        this.onModalClose();
      }
    });
  };
}

export default ModalController;
