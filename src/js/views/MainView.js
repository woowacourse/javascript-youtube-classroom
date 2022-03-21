import { $ } from '../utils/dom.js';
import { on } from '../utils/event.js';

export default class MainView {
  constructor() {
    this.$searchModalButton = $('.nav-right__button');
    this.$modalContainer = $('.modal-container');

    this.$toastWrapper = $('.toast-wrapper');
    this.$darkToggle = $('.classroom__toggle');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchModalButton, 'click', this.#openSearchModal.bind(this));
    on(this.$darkToggle, 'click', this.toggleDarkMode);
  }

  #openSearchModal() {
    this.$modalContainer.classList.remove('hide');
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
