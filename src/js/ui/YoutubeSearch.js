import { request } from '../domain/youtubeApi';
import { debounce } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeleton } from './skeleton';
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
    skeleton.renderSkeletonUI();
    request(this.input.value)
      .then(videoData => {
        youtubeSearchResult.renderInitialVideoList(videoData);
      })
      .catch(({ message }) => {
        showSnackBar(message);
        skeleton.removeSkeletonUI();
      });
  };

  reset() {
    youtubeSearchResult.resetVideoList();
    this.input.value = '';
  }
}
