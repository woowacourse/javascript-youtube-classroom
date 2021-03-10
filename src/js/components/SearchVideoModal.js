import { SearchVideoInput, SearchVideoResult } from './index.js';
import { SearchKeywordHistoryManager } from '../model/index.js';
import { $ } from '../util/index.js';

export class SearchVideoModal {
  constructor({ savedVideoManager }) {
    this.$modal = $('.js-search-video-modal');
    this.$closeButton = $('.js-search-modal-close-button');

    this.searchKeywordHistoryManager = new SearchKeywordHistoryManager();
    this.searchVideoInput = new SearchVideoInput({
      searchKeywordHistoryManager: this.searchKeywordHistoryManager,
      savedVideoManager,
    });
    this.searchVideoResult = new SearchVideoResult({
      searchKeywordHistoryManager: this.searchKeywordHistoryManager,
      savedVideoManager,
    });

    this.initEvent();
  }

  initEvent() {
    this.$closeButton.addEventListener('click', this.closeModal.bind(this));
    this.$modal.addEventListener('click', ({ currentTarget, target }) => {
      if (currentTarget === target) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.$modal.classList.add('open');
    this.$modal.querySelector('input[type="text"]').focus();
  }

  closeModal() {
    this.$modal.classList.remove('open');
  }
}
