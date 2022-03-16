import { $ } from '../utils/dom.js';
import { on } from '../utils/event.js';

export default class AppView {
  constructor() {
    this.$searchModalButton = $('.nav__button');
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.$closeButton = $('.x-shape');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchModalButton, 'click', this.#handleClickButton.bind(this));
    on(this.$closeButton, 'click', this.#closeModal.bind(this));
    window.addEventListener('click', (event) => (event.target === this.$dimmer ? this.#closeModal() : false));
  }

  #closeModal() {
    this.$modalContainer.classList.add('hide');
  }

  #handleClickButton() {
    this.$modalContainer.classList.remove('hide');
  }
}
