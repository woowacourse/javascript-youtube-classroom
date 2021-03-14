import { CLASS, SELECTOR } from '../constants/constant.js';
import { $, toggleSelectorClass } from '../utils/util.js';

class ModalController {
  #storageModel;
  #searchView;
  #$modal;
  #$modalClose;

  constructor({ model, view }) {
    this.#storageModel = model.storageModel;
    this.#searchView = view.searchView;
    this.#$modal = $(SELECTOR.MODAL);
    this.#$modalClose = $(SELECTOR.MODAL_CLOSE);
  }

  init = () => {
    this.#handleModalOpen();
    this.#handleModalClose();
  };

  #loadInfos = () => {
    this.#searchView.renderSavedVideoCountSection(
      this.#storageModel.savedVideoCount
    );

    this.#searchView.renderRecentKeywordSection(
      this.#storageModel.recentKeywords
    );
  };

  #onModalShow = () => {
    this.#loadInfos();
    toggleSelectorClass(this.#$modal, CLASS.OPEN, true);
  };

  #onModalClose = () => {
    toggleSelectorClass(this.#$modal, CLASS.OPEN, false);
  };

  #handleModalOpen = () => {
    $(SELECTOR.SEARCH_MODAL_BUTTON).addEventListener('click', () =>
      this.#onModalShow()
    );
  };

  #handleModalClose = () => {
    window.addEventListener('click', ({ target }) => {
      if (target === this.#$modal || this.#$modalClose.contains(target)) {
        this.#onModalClose();
      }
    });
  };
}

export default ModalController;
