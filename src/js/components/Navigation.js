import { $ } from '../util/index.js';

export class Navigation {
  constructor({ handleIsCompleted, handleOpenModal }) {
    this.$navigation = $('nav');
    this.handleIsCompleted = handleIsCompleted;
    this.handleOpenModal = handleOpenModal;

    this.initEvent();
  }

  initEvent() {
    this.$navigation.addEventListener('click', ({ target }) => {
      if (target.classList.contains('js-uncompleted-video-button')) {
        this.handleIsCompleted(false);
        return;
      }

      if (target.classList.contains('js-completed-video-button')) {
        this.handleIsCompleted(true);
        return;
      }

      if (target.classList.contains('js-search-button')) {
        this.handleOpenModal();
        return;
      }
    });
  }
}
