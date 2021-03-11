import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleIsChecked, handleOpenModal }) {
    this.$navigation = $('nav');
    this.$searchButton = $('.js-search-button');
    this.$checkedButton = $('.js-checked-video');
    this.handleIsChecked = handleIsChecked;
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$searchButton.addEventListener('click', event => {
      this.handleOpenModal();
    });
  }
}
