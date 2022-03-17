import { $ } from './utils.js';
import { SELECTOR } from '../constants/index.js';

export default class SearchModalView {
  #$modal;

  #$searchModalButton;

  #$modalBackground;

  constructor() {
    this.#$modal = $(SELECTOR.SEARCH_MODAL);
    this.#$searchModalButton = $(SELECTOR.SEARCH_MODAL_BUTTON);
    this.#$modalBackground = $(SELECTOR.MODAL_BACKGROUND);
  }

  bindShowModal() {
    this.#$searchModalButton.addEventListener('click', () => {
      this.#controllModal('remove');
    });
  }

  bindCloseModal() {
    this.#$modalBackground.addEventListener('click', this.#controllModal.bind(this, 'add'));

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.#controllModal('add');
      }
    });
  }

  #controllModal(order) {
    this.#$modal.classList[order]('hide');
  }
}
