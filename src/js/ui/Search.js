import { MESSAGE } from '../constants';
import { request } from '../domain/youtubeApi';
import { delay } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeleton } from './skeleton';
import { result } from './Result';

export default class Search {
  constructor() {
    this.input = $('#search-input-keyword');
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if (this.input.value === '') {
        showSnackBar(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
        return;
      }

      skeleton.renderSkeletonUI();

      request(this.input.value)
        .then(json => {
          result.renderInitialVideoList(json);
        })
        .catch(async ({ message }) => {
          await delay(700);
          showSnackBar(message);
          skeleton.removeSkeletonUI();
        });
    });
  }

  reset() {
    result.resetVideoList();
    this.input.value = '';
  }
}
