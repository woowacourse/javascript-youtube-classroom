import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

export default class SearchModalView {
  constructor() {
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.$closeButton = $('.x-shape');
    this.$unwatchedButton = $('.nav-left__button--unwatched');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$closeButton, 'click', this.#closeSearchModal.bind(this));
    window.addEventListener('click', (event) => (event.target === this.$dimmer ? this.#closeSearchModal() : false));
  }

  #closeSearchModal() {
    emit(this.$unwatchedButton, '@show-unwatched-tab');
    this.$modalContainer.classList.add('hide');
  }
}
