import { $ } from '../utils/util.js';

class ModalController {
  #storageModel;
  #savedView;
  #searchView;
  #$modal;

  constructor(storageModel, savedView, searchView) {
    this.#storageModel = storageModel;
    this.#savedView = savedView;
    this.#searchView = searchView;
    this.#$modal = $('.modal');
  }

  init = () => {
    this.handleModalOpen();
    this.handleModalClose();
  };

  loadInfos = () => {
    this.#searchView.renderSavedVideoCountSection(
      this.#storageModel.savedVideoCount
    );
    this.#searchView.renderRecentKeywordSection(
      this.#storageModel.recentKeywords
    );
    // this.#searchView.toggleNotFound(true);
  };

  onModalShow = () => {
    this.loadInfos();
    this.#$modal.classList.add('open');
  };

  onModalClose = () => {
    this.#$modal.classList.remove('open');
  };

  handleModalOpen = () => {
    const $searchModalButton = $('#search-modal-button');
    $searchModalButton.addEventListener('click', () => this.onModalShow());
  };

  handleModalClose = () => {
    this.#$modal.addEventListener('click', event => {
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
