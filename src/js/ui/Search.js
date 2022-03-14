import { MESSAGE } from '../constants';
import { request } from '../domain/youtubeApi';
import { delay } from '../utils/common';
import { $, showExceptionSnackBar } from '../utils/dom';
import Result from './Result';
import { skeleton } from './skeleton';

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

      skeleton.renderSkeletonUI();

      request(this.input.value)
        .then(json => {
          this.result.renderInitialVideoList(json);
        })
        .catch(async ({ message }) => {
          await delay(700);
          showExceptionSnackBar(message);
          skeleton.removeSkeletonUI();
        });
    });
  }

  reset() {
    this.result.resetVideoList();
    this.input.value = '';
  }
}
