import { SearchVideoInput } from './index.js';
import { $ } from '../util/index.js';

export class SearchVideoModal {
  constructor() {
    this.$modal = $('.js-search-video-modal');
    this.$closeButton = $('.js-search-modal-close-button');
    this.searchVideoInput = new SearchVideoInput();
    this.initEvent();
  }

  initEvent() {
    this.$closeButton.addEventListener('click', this.closeModal.bind(this));
  }

  openModal() {
    this.$modal.classList.add('open');
  }

  closeModal() {
    this.$modal.classList.remove('open');
  }
}
