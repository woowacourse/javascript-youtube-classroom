import { $ } from '../utils/dom.js';
import { emit, on } from '../utils/event.js';
import throttle from '../utils/throttle.js';

export default class SearchInputView {
  constructor() {
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$searchButton = $('#search-button');
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$searchButton, 'click', throttle(this.#handleClick.bind(this), 2000));
    on(this.$searchInputKeyword, 'keypress', throttle(this.#handleKeypress.bind(this), 500));
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
