import { $ } from '../utils/dom.js';

export default class AppView {
  constructor() {
    this.$searchModalButton = $('#search-modal-button');
    this.$modalContainer = $('.modal-container');

    this.#bindEvents();
  }

  #bindEvents() {
    this.$searchModalButton.addEventListener('click', this.#handleClickButton.bind(this));
  }

  #handleClickButton() {
    this.$modalContainer.classList.remove('hide');
  }
}
