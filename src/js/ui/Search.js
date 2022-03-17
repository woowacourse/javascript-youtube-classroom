import { MESSAGE } from '../constants';
import { request } from '../domain/youtubeApi';
import { debounce } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeleton } from './skeleton';
import { result } from './Result';

export default class Search {
  constructor() {
    this.input = $('#search-input-keyword');
    this.searchForm = $('#search-form');
    this.preventFormDefaultEvent();
    this.searchForm.addEventListener('submit', debounce(this.handleSubmit, 300));
  }

  preventFormDefaultEvent() {
    this.searchForm.addEventListener('submit', e => {
      e.preventDefault();
    });
  }

  handleSubmit = () => {
    if (this.input.value === '') {
      showSnackBar(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
      return;
    }
    $('.video-list').replaceChildren();
    skeleton.renderSkeletonUI();
    request(this.input.value)
      .then(json => {
        result.renderInitialVideoList(json);
      })
      .catch(({ message }) => {
        showSnackBar(message);
        skeleton.removeSkeletonUI();
      });
  };

  reset() {
    result.resetVideoList();
    this.input.value = '';
  }
}
