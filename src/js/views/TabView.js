import { $, $$ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';
import Template from './Template.js';

export default class TabView {
  constructor() {
    this.template = new Template();
    this.$savedListContainer = $('.saved-list-container');
    this.$unwatchedButton = $('.nav-left__button--unwatched');
    this.$watchedButton = $('.nav-left__button--watched');
    this.$unwatchedTab = $('.unwatched-tab');
    this.$watchedTab = $('.watched-tab');
    this.$confirmModalContainer = $('.confirm-modal-container');
    this.$noResult = $('.no-result');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$unwatchedButton, 'click', this.#handleUnwatchedButton.bind(this));
    on(this.$watchedButton, 'click', this.#handleWatchedButton.bind(this));
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
    this.$unwatchedButton.classList.add('clicked');
    this.$watchedButton.classList.remove('clicked');
    this.$unwatchedTab.classList.remove('hide');
    this.$watchedTab.classList.add('hide');
  }

  showWatchedTab() {
    this.$unwatchedButton.classList.remove('clicked');
    this.$watchedButton.classList.add('clicked');
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
    emit(this.$savedListContainer, '@delete-video', { videoId });
  }

  #showConfirmModal() {
    this.$confirmModalContainer.classList.remove('hide');
  }

  showEmptyTab() {
    this.$noResult.classList.remove('hide');
  }

  hideEmptyTab() {
    this.$noResult.classList.add('hide');
  }
}
