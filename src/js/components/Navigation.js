import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleIsChecked, handleOpenModal }) {
    this.$navigation = $('nav');
    this.handleIsChecked = handleIsChecked;
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$navigation.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-uncompleted-video-button')) {
        this.handleIsChecked(false);
        return;
      }

      if (target.classList.contains('js-completed-video-button')) {
        this.handleIsChecked(true);
        return;
      }

      if (target.classList.contains('js-search-button')) {
        this.handleOpenModal();
        return;
      }
    });
  }
}
