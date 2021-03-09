import { $ } from '../utils/util.js';

class ModalController {
  #storageModel;
  #savedView;
  #searchView;

  constructor(storageModel, savedView, searchView) {
    this.#storageModel = storageModel;
    this.#savedView = savedView;
    this.#searchView = searchView;
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
  };

  onModalShow = () => {
    const $modal = $('.modal');
    this.loadInfos();
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
