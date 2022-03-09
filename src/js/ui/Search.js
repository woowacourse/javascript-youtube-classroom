import { MESSAGE } from '../constants';
import { API_KEY } from '../domain/key';
import { request } from '../domain/youtubeApi';
import { $, showExceptionSnackBar } from '../utils/dom';
import Result from './Result';

export default class Search {
  constructor() {
    this.result = new Result();
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if ($('#search-input-keyword').value === '') {
        showExceptionSnackBar(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
        return;
      }

      this.result.renderSkeletonUI();

      try {
        request($('#search-input-keyword').value, API_KEY).then(json => {
          this.result.renderVideoList(json);
        });
      } catch ({ message }) {
        console.log(message);
      }
    });
  }
}
