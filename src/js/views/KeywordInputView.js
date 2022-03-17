import { $ } from './utils.js';
import { SELECTOR } from '../constants/index.js';

export default class KeywordInputView {
  #$keywordInput;

  #$searchForm;

  constructor() {
    this.#$keywordInput = $(SELECTOR.SEARCH_INPUT_KEYWORD);
    this.#$searchForm = $(SELECTOR.SEARCH_FORM);
  }

  bindSubmitKeyword(handler) {
    this.#$searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler(this.#$keywordInput.value);
    });
  }
}
