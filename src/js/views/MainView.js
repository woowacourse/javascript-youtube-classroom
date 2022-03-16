import { $, $$ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';
import Template from './Template.js';

export default class MainView {
  constructor() {
    this.template = new Template();
    this.$searchModalButton = $('.nav-right__button');
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.$closeButton = $('.x-shape');
    this.$unwatchedButton = $('.nav-left__button--unwatched');
    this.$watchedButton = $('.nav-left__button--watched');
    this.$unwatchedTab = $('.unwatched-tab');
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
    emit(this.$unwatchedButton, '@show-unwatched-tab');
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

  renderUnwatchedVideoItems(videoItems) {
    this.$unwatchedTab.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getUnwatchedVideo(item);
      this.$unwatchedTab.insertAdjacentHTML('beforeend', $videoItem);
    });

    on(this.$unwatchedTab, 'click', this.#checkWatchedButton.bind(this));
  }

  renderWatchedVideoItems(videoItems) {
    this.$watchedTab.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getWatchedVideo(item);
      this.$watchedTab.insertAdjacentHTML('beforeend', $videoItem);
    });

    on(this.$watchedTab, 'click', this.#checkUnwatchedButton.bind(this));
  }

  #checkWatchedButton(event) {
    if (event.target.classList.contains('video-item__button--watched')) {
      const videoId = event.target.dataset.id;
      emit(event.currentTarget, '@check-watched', { videoId });
    }
  }

  #checkUnwatchedButton(event) {
    if (event.target.classList.contains('video-item__button--watched')) {
      const videoId = event.target.dataset.id;
      emit(event.currentTarget, '@check-unwatched', { videoId });
    }
  }
}
