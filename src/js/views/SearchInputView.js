import debounce from '../utils/debounce.js';
import { $ } from '../utils/dom.js';
import { emit, on } from '../utils/event.js';

export default class SearchInputView {
  constructor() {
    this.$searchInputKeyword = $('.search-input__keyword');
    this.$searchButton = $('.search-input__search-button');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchButton, 'click', debounce(this.#handleClick.bind(this), 500));
    on(this.$searchInputKeyword, 'keypress', debounce(this.#handleKeypress.bind(this), 500));
  }

  #handleKeypress(event) {
    if (event.key === 'Enter') {
      this.#handleClick();
    }
  }

  #handleClick() {
    const keyword = this.$searchInputKeyword.value;
    emit(this.$searchButton, '@search', { keyword });
  }
}
