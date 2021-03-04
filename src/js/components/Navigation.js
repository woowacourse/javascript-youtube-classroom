import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleOpenModal }) {
    this.$navigation = $('nav');
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$navigation.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-uncompleted-video-button')) {
        return;
      }

      if (target.classList.contains('js-completed-video-button')) {
        return;
      }

      if (target.classList.contains('js-search-button')) {
        this.handleOpenModal();
        return;
      }
    });
  }
}
