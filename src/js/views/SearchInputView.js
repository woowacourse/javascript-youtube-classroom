import KEYCODE from '../../constants/keycode.js';

import { $ } from '../utils/dom.js';
import { emit, on } from '../utils/event.js';

export default class SearchInputView {
  constructor() {
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$searchButton = $('#search-button');
    this.$closeButton = $('.close-button');
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchButton, 'click', this.#handleClick.bind(this));
    on(this.$searchInputKeyword, 'keydown', this.#handleKeydown.bind(this));
    on(this.$closeButton, 'click', this.#handleClickCloseButton.bind(this));
    on(this.$dimmer, 'click', this.#handleClickCloseButton.bind(this));
    on(document, 'keydown', this.#handleKeydown.bind(this));
  }

  #handleKeydown() {
    if (window.event.keyCode === KEYCODE.ENTER) {
      this.#handleClick();
    }
    if (window.event.keyCode === KEYCODE.ESC) {
      this.#handleClickCloseButton();
    }
  }

  #handleClick() {
    const keyword = this.$searchInputKeyword.value;
    emit(this.$searchButton, '@search', { keyword });
  }

  #handleClickCloseButton() {
    emit(this.$closeButton, '@close-modal');
  }

  hideModal() {
    this.$modalContainer.classList.add('hide');
  }

  resetSearchInputKeyword() {
    this.$searchInputKeyword.value = '';
  }
}
