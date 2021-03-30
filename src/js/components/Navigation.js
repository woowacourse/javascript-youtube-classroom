import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleOpenModal }) {
    this.$navigation = $('nav');
    this.$searchButton = $('.js-search-button');
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$searchButton.addEventListener('click', () => {
      this.handleOpenModal();
    });
  }
}
