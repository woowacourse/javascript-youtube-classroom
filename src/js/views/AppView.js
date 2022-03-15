import { $ } from '../utils/dom.js';

export default class AppView {
  constructor() {
    this.$searchModalButton = $('#search-modal-button');
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.#bindEvents();
  }

  #bindEvents() {
    this.$searchModalButton.addEventListener('click', this.#handleClickButton.bind(this));
    window.addEventListener('click', (event) =>
      event.target === this.$dimmer ? this.$modalContainer.classList.add('hide') : false,
    );
  }

  #handleClickButton() {
    this.$modalContainer.classList.remove('hide');
  }
}
