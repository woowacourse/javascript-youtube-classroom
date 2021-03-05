import { $ } from '../utils/util.js';

class ModalController {
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
    const $searchButton = $('#search-button');
    $searchButton.addEventListener('click', () => this.onModalShow());
  };

  handleModalClose = () => {
    const $modalClose = $('.modal-close');
    $modalClose.addEventListener('click', () => this.onModalClose());
  };
}
export default ModalController;
