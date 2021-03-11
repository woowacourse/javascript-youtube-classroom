import { CLASS, SELECTOR } from '../constants/constant.js';
import { $, toggleSelectorClass } from '../utils/util.js';

class ModalController {
  #storageModel;
  #savedView;
  #searchView;
  #$modal;

  constructor(storageModel, savedView, searchView) {
    this.#storageModel = storageModel;
    this.#savedView = savedView;
    this.#searchView = searchView;
    this.#$modal = $(SELECTOR.MODAL);
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
    this.loadInfos();
    toggleSelectorClass(this.#$modal, CLASS.OPEN, true);
  };

  onModalClose = () => {
    toggleSelectorClass(this.#$modal, CLASS.OPEN, false);
  };

  handleModalOpen = () => {
    const $searchModalButton = $(SELECTOR.SEARCH_MODAL_BUTTON);
    $searchModalButton.addEventListener('click', () => this.onModalShow());
  };

  handleModalClose = () => {
    this.#$modal.addEventListener('click', event => {
      if (
        event.target.querySelector(SELECTOR.MODAL_INNER) ||
        event.target.closest(SELECTOR.MODAL_CLOSE)
      ) {
        this.onModalClose();
      }
    });
  };
}

export default ModalController;
