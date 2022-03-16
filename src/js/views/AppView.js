import { $ } from '../utils/dom.js';
import { on } from '../utils/event.js';

export default class AppView {
  constructor() {
    this.$searchModalButton = $('.nav-right__button');
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.$closeButton = $('.x-shape');
    this.$watchLaterButton = $('.nav-left__button--watch-later');
    this.$watchedButton = $('.nav-left__button--watched-already');
    this.$watchLaterTab = $('.watch-later-tab');
    this.$watchedTab = $('.watched-tab');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchModalButton, 'click', this.#openSearchModal.bind(this));
    on(this.$closeButton, 'click', this.#closeModal.bind(this));
    window.addEventListener('click', (event) => (event.target === this.$dimmer ? this.#closeModal() : false));
    on(this.$watchLaterButton, 'click', this.#showWatchLaterTab.bind(this));
    on(this.$watchedButton, 'click', this.#showWatchedTab.bind(this));
  }

  #closeModal() {
    this.$modalContainer.classList.add('hide');
  }

  #openSearchModal() {
    this.$modalContainer.classList.remove('hide');
  }

  #showWatchLaterTab() {
    this.$watchLaterTab.classList.remove('hide');
    this.$watchedTab.classList.add('hide');
  }

  #showWatchedTab() {
    this.$watchLaterTab.classList.add('hide');
    this.$watchedTab.classList.remove('hide');
  }
}
