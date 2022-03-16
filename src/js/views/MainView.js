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
    this.watchButton = this.watchButton.bind(this);
    this.unwatchButton = this.unwatchButton.bind(this);
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
    this.$unwatchedButton.classList.add('active');
    this.$watchedButton.classList.remove('active');
    this.$unwatchedTab.classList.remove('hide');
    this.$watchedTab.classList.add('hide');
  }

  showWatchedTab() {
    this.$unwatchedButton.classList.remove('active');
    this.$watchedButton.classList.add('active');
    this.$watchedTab.classList.remove('hide');
    this.$unwatchedTab.classList.add('hide');
  }

  renderUnwatchedVideoItems(videoItems) {
    this.$unwatchedTab.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getVideoItem(item);
      this.$unwatchedTab.insertAdjacentHTML('beforeend', $videoItem);
    });

    // on(this.$unwatchedTab, 'click', this.watchButton.bind(this, '@check-watched'));
    this.$watchedTab.removeEventListener('click', this.unwatchButton);
    this.$unwatchedTab.addEventListener('click', this.watchButton);
  }

  renderWatchedVideoItems(videoItems) {
    this.$watchedTab.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getVideoItem(item);
      this.$watchedTab.insertAdjacentHTML('beforeend', $videoItem);
    });
    $$('.video-item__button--watched').forEach((button) => button.classList.add('active'));
    // on(this.$watchedTab, 'click', this.watchButton.bind(this, '@check-unwatched'));

    this.$unwatchedTab.removeEventListener('click', this.watchButton);
    this.$watchedTab.addEventListener('click', this.unwatchButton);
  }

  watchButton(event) {
    if (event.target.classList.contains('video-item__button--watched')) {
      const videoId = event.target.dataset.id;
      emit(event.currentTarget, '@check-watched', { videoId });
    }
  }

  unwatchButton(event) {
    if (event.target.classList.contains('video-item__button--watched')) {
      const videoId = event.target.dataset.id;
      emit(event.currentTarget, '@check-unwatched', { videoId });
    }
  }
}
