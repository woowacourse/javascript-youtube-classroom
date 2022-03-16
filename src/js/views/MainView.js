import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';
import Template from './Template.js';

export default class MainView {
  constructor() {
    this.template = new Template();
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
    on(this.$watchLaterButton, 'click', this.#handleWatchLaterButton.bind(this));
    on(this.$watchedButton, 'click', this.#handleWatchedButton.bind(this));
  }

  #closeModal() {
    this.$modalContainer.classList.add('hide');
  }

  #openSearchModal() {
    this.$modalContainer.classList.remove('hide');
  }

  #handleWatchLaterButton() {
    emit(this.$watchLaterButton, '@show-watch-later-tab');
  }

  #handleWatchedButton() {
    emit(this.$watchedButton, '@show-watched-tab');
  }

  showWatchLaterTab() {
    this.$watchLaterButton.classList.add('opened');
    this.$watchedButton.classList.remove('opened');
    this.$watchLaterTab.classList.remove('hide');
    this.$watchedTab.classList.add('hide');
  }

  showWatchedTab() {
    this.$watchLaterButton.classList.remove('opened');
    this.$watchedButton.classList.add('opened');
    this.$watchLaterTab.classList.add('hide');
    this.$watchedTab.classList.remove('hide');
  }

  renderWatchLaterVideoItems(savedVideoItems) {
    this.$watchLaterTab.replaceChildren();
    savedVideoItems.forEach((item) => {
      const $savedVideoItem = this.template.getSavedVideo(item);
      this.$watchLaterTab.insertAdjacentHTML('beforeend', $savedVideoItem);
    });
  }
}
