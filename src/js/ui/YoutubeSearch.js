import { requestApi } from '../domain/requestApi';
import { debounce } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeletonUI } from './skeletonUI';
import { youtubeSearchResult } from './youtubeSearchResult';

export default class YoutubeSearch {
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
    $('.video-list').replaceChildren();
    skeletonUI.render();
    requestApi(this.input.value)
      .then(videoData => {
        youtubeSearchResult.renderInitialVideoList(videoData);
      })
      .catch(({ message }) => {
        showSnackBar(message);
        skeletonUI.remove();
      });
  };

  reset() {
    youtubeSearchResult.resetVideoList();
    this.input.value = '';
  }
}
