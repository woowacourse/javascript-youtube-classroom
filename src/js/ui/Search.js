import Result from './Result';
import { skeletonUI } from './loading';
import { MESSAGE } from '../constants';
import { $ } from '../utils/dom';
import { showExceptionSnackBar } from '../utils/snackBar';

export default class Search {
  constructor() {
    this.input = $('#search-input-keyword');
    this.result = new Result();
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if (this.input.value === '') {
        showExceptionSnackBar(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
        return;
      }

      $('.video-list').replaceChildren();
      skeletonUI.render();
      this.result.renderInitialVideoList(this.input.value);
    });
  }

  reset() {
    this.result.resetVideoList();
    this.input.value = '';
  }
}
