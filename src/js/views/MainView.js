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
    this.$confirmModalContainer = $('.confirm-modal-container');
    this.$toastWrapper = $('.toast-wrapper');
    this.$darkToggle = $('.classroom__toggle');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchModalButton, 'click', this.#openSearchModal.bind(this));
    on(this.$closeButton, 'click', this.#closeModal.bind(this));
    window.addEventListener('click', (event) => (event.target === this.$dimmer ? this.#closeModal() : false));
    on(this.$unwatchedButton, 'click', this.#handleUnwatchedButton.bind(this));
    on(this.$watchedButton, 'click', this.#handleWatchedButton.bind(this));
    on(this.$darkToggle, 'click', this.toggleDarkMode);
  }

  #openSearchModal() {
    this.$modalContainer.classList.remove('hide');
  }

  #closeModal() {
    this.#handleUnwatchedButton();
    this.$modalContainer.classList.add('hide');
  }

  #handleUnwatchedButton() {
    emit(this.$unwatchedButton, '@show-unwatched-tab');
  }

  #handleWatchedButton() {
    emit(this.$watchedButton, '@show-watched-tab');
  }

  renderUnwatchedVideoItems(videoItems) {
    this.$unwatchedTab.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getVideoItem(item);
      this.$unwatchedTab.insertAdjacentHTML('beforeend', $videoItem);
    });
    this.$watchedTab.removeEventListener('click', this.#unwatchVideoButton);
    this.$unwatchedTab.addEventListener('click', this.#watchVideoButton);

    this.$watchedTab.removeEventListener('click', this.#deleteVideoButton);
    this.$unwatchedTab.addEventListener('click', this.#deleteVideoButton);
  }

  renderWatchedVideoItems(videoItems) {
    this.$watchedTab.replaceChildren();
    videoItems.forEach((item) => {
      const $videoItem = this.template.getVideoItem(item);
      this.$watchedTab.insertAdjacentHTML('beforeend', $videoItem);
    });
    $$('.video-item__button--watched').forEach((button) => button.classList.add('active'));
    this.$unwatchedTab.removeEventListener('click', this.#watchVideoButton);
    this.$watchedTab.addEventListener('click', this.#unwatchVideoButton);

    this.$watchedTab.addEventListener('click', this.#deleteVideoButton);
    this.$unwatchedTab.removeEventListener('click', this.#deleteVideoButton);
  }

  #watchVideoButton = (event) => {
    if (event.target.classList.contains('video-item__button--watched')) {
      const videoId = event.target.id;
      emit(event.currentTarget, '@check-watched', { videoId });
    }
  };

  #unwatchVideoButton = (event) => {
    if (event.target.classList.contains('video-item__button--watched')) {
      const videoId = event.target.id;
      emit(event.currentTarget, '@check-unwatched', { videoId });
    }
  };

  #deleteVideoButton = (event) => {
    if (event.target.classList.contains('video-item__button--delete')) {
      const videoId = event.target.id;
      emit(event.currentTarget, '@check-delete', { videoId });
    }
  };

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

  removeVideo(videoId) {
    document.getElementById(videoId).remove();
  }

  confirmDelete(videoId, title) {
    this.$confirmModalContainer.replaceChildren();
    this.$confirmModalContainer.insertAdjacentHTML('beforeend', this.template.getConfirmModal(title));
    $('.confirm-modal__cancel-button').addEventListener('click', () => this.#handleCancelButton(), { once: true });
    $('.confirm-modal__delete-button').addEventListener('click', () => this.#handleDeleteButton(videoId), {
      once: true,
    });
    this.#showConfirmModal();
  }

  #handleCancelButton() {
    this.hideConfirmModal();
  }

  hideConfirmModal() {
    this.$confirmModalContainer.classList.add('hide');
  }

  #handleDeleteButton(videoId) {
    emit(this.$modalContainer, '@delete-video', { videoId });
  }

  #showConfirmModal() {
    this.$confirmModalContainer.classList.remove('hide');
  }

  toastNotification = (state, message) => {
    let hideTimeout = null;
    const $toastModal = `
      <div class="toast toast--visible toast--${state}">${message}</div>
    `;
    this.$toastWrapper.insertAdjacentHTML('beforeEnd', $toastModal);

    clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
      $(`.toast--${state}`).classList.remove(`toast--visible`);
      $(`.toast--${state}`).remove();
    }, 3000);
  };

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}
