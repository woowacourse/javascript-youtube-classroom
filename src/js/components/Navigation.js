import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleIsChecked, handleOpenModal }) {
    this.$navigation = $('nav');
    this.$uncheckedButton = $('.js-unchecked-video-button');
    this.$checkedButton = $('.js-checked-video-button');
    this.handleIsChecked = handleIsChecked;
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$navigation.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-unchecked-video-button')) {
        this.handleIsChecked(false);
        this.toggleButtonColor();

        return;
      }

      if (target.classList.contains('js-checked-video-button')) {
        this.handleIsChecked(true);
        this.toggleButtonColor();

        return;
      }

      if (target.classList.contains('js-search-button')) {
        this.handleOpenModal();

        return;
      }
    });
  }

  toggleButtonColor() {
    this.$uncheckedButton.classList.toggle('bg-cyan-100');
    this.$checkedButton.classList.toggle('bg-cyan-100');
  }
}
