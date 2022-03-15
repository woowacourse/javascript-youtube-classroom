import KEYCODE from '../../constants/keycode.js';

import { $ } from '../utils/dom.js';
import { emit, on } from '../utils/event.js';

export default class SearchInputView {
  constructor() {
    this.$searchInput = $('.search-input');
    this.$searchInputKeyword = $('#search-input-keyword', this.$searchInput);
    this.$searchButton = $('#search-button', this.$searchInput);

    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchButton, 'click', this.#handleClick.bind(this));
    on(this.$searchInputKeyword, 'keydown', this.#handleKeydown.bind(this));
  }

  #handleKeydown() {
    if (window.event.keyCode === KEYCODE.ENTER) {
      this.#handleClick();
    }
  }

  #handleClick() {
    const keyword = this.$searchInputKeyword.value;
    emit(this.$searchButton, '@search', { keyword });
  }

  resetSearchInputKeyword() {
    this.$searchInputKeyword.value = '';
  }
}
