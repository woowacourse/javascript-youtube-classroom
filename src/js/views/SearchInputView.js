import { $ } from '../utils/dom.js';
import { emit, on } from '../utils/event.js';

export default class SearchInputView {
  constructor() {
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$searchButton = $('#search-button');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchButton, 'click', this.#handleClick.bind(this));
    on(this.$searchInputKeyword, 'keypress', this.#handleKeypress.bind(this));
  }

  #handleKeypress() {
    if (window.event.keyCode === 13) {
      this.#handleClick();
    }
  }

  #handleClick() {
    const keyword = this.$searchInputKeyword.value;
    emit(this.$searchButton, '@search', { keyword });
  }
}
