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
    this.$unwatchedButton = $('.nav-left__button--watch-later');
    this.$watchedButton = $('.nav-left__button--watched-already');
    this.$unwatchedTab = $('.watch-later-tab');
    this.$watchedTab = $('.watched-tab');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchModalButton, 'click', this.#openSearchModal.bind(this));
    on(this.$closeButton, 'click', this.#closeModal.bind(this));
    window.addEventListener('click', (event) => (event.target === this.$dimmer ? this.#closeModal() : false));
    on(this.$unwatchedButton, 'click', this.#handleUnwatchedButton.bind(this));
    on(this.$watchedButton, 'click', this.#handleWatchedButton.bind(this));
  }

  #closeModal() {
    this.$modalContainer.classList.add('hide');
  }

  #openSearchModal() {
    this.$modalContainer.classList.remove('hide');
  }

  #handleUnwatchedButton() {
    emit(this.$unwatchedButton, '@show-watch-later-tab');
  }

  #handleWatchedButton() {
    emit(this.$watchedButton, '@show-watched-tab');
  }

  showUnwatchedTab() {
    this.$unwatchedButton.classList.add('opened');
    this.$watchedButton.classList.remove('opened');
    this.$unwatchedTab.classList.remove('hide');
    this.$watchedTab.classList.add('hide');
  }

  showWatchedTab() {
    this.$unwatchedButton.classList.remove('opened');
    this.$watchedButton.classList.add('opened');
    this.$watchedTab.classList.remove('hide');
    this.$unwatchedTab.classList.add('hide');
  }

  renderVideoItems(videoItems, target) {
    target.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getSavedVideo(item);
      target.insertAdjacentHTML('beforeend', $videoItem);
    });
  }
}
