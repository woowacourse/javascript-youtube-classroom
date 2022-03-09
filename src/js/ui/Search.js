import { ERROR_MESSAGE } from '../constants';
import { $, showExceptionSnackBar } from '../utils/dom';
export default class Search {
  constructor() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if ($('#search-input-keyword').value === '') {
        showExceptionSnackBar(ERROR_MESSAGE.BLANK_SEARCH_INPUT);
        return;
      }
    });
  }
}
