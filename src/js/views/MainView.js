import { $ } from '../utils/dom.js';
import { on } from '../utils/event.js';

export default class MainView {
  constructor() {
    this.$searchModalButton = $('.nav-right__button');
    this.$modalContainer = $('.modal-container');

    this.$toastWrapper = $('.toast-wrapper');
    this.$toggleSwitch = $('.classroom__toggle');
    this.#bindEvents();
    this.#watchDarkMode();
  }

  #bindEvents() {
    on(this.$searchModalButton, 'click', this.#openSearchModal.bind(this));
    on(this.$toggleSwitch, 'change', (event) => this.#switchTheme(event));
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

  #watchDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('user-theme', 'dark');
      this.$toggleSwitch.checked = true;
    } else {
      document.documentElement.setAttribute('user-theme', 'light');
      this.$toggleSwitch.checked = false;
    }
  }

  #switchTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('user-theme', 'dark');
      this.$toggleSwitch.checked = true;
    } else {
      document.documentElement.setAttribute('user-theme', 'light');
      this.$toggleSwitch.checked = false;
    }
  }
}
