import SearchResult from './SearchResult';
import { skeletonUI } from './loading';
import { MESSAGE } from '../constants';
import { $ } from '../utils/dom';
import { showExceptionSnackBar } from '../utils/snackBar';

export default class Search {
  constructor() {
    this.input = $('#search-input-keyword');
    this.result = new SearchResult();
    this.addSubmitEvent();
    this.addClearButtonClickEvent();
  }

  addSubmitEvent() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if (this.input.value === '') {
        showExceptionSnackBar(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
        return;
      }

      const $searchResult = $('.search-result');
      $searchResult.replaceChildren();
      $searchResult.insertAdjacentHTML(
        'beforeend',
        '<ul class="video-list"></ul>',
      );
      skeletonUI.render();
      this.result.renderInitialVideoList(this.input.value);
    });
  }

  addClearButtonClickEvent() {
    $('.search-input__clear').addEventListener('click', () => {
      this.input.value = '';
      this.input.focus();
    });
  }

  reset() {
    this.result.resetVideoList();
    this.input.value = '';
  }
}
