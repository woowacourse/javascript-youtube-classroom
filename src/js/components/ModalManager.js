import { $, openModal, closeModal } from '../utils.js';
import { SELECTORS } from '../constants.js';

export default class ModalManager {
  constructor() {}

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $(SELECTORS.ID.SEARCH_BUTTON).addEventListener('click', () => {
      openModal(SELECTORS.CLASS.MODAL);
      $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).focus();
    });

    $(SELECTORS.CLASS.MODAL_CLOSE).addEventListener('click', () => {
      closeModal(SELECTORS.CLASS.MODAL);
    });

    $(SELECTORS.CLASS.VIDEO_MODAL).addEventListener('click', (event) => {
      if (!event.target.classList.contains('video-modal')) return;

      closeModal(SELECTORS.CLASS.VIDEO_MODAL);
      $(SELECTORS.CLASS.VIDEO_MODAL_PLAYER).remove();
    });
  }
}
