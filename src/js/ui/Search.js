import { $, showExceptionSnackBar } from '../utils/dom';

export default class Search {
  constructor() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if ($('#search-input-keyword').value === '') {
        showExceptionSnackBar('테스트');
        return;
      }
    });
  }
}
