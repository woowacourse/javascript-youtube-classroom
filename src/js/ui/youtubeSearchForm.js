import { requestApi } from '../domain/requestApi';
import { debounce } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeletonUI } from './skeletonUI';
import { youtubeSearchResult } from './youtubeSearchResult';

export const youtubeSearchForm = {
  $searchForm: $('#search-form'),

  preventFormDeafultEvent() {
    this.$searchForm.addEventListener('submit', e => {
      e.preventDefault();
    });
  },

  addSearchEvent() {
    this.$searchForm.addEventListener('submit', debounce(this.handleSubmit, 300));
  },

  handleSubmit() {
    youtubeSearchResult.resetVideoList();
    skeletonUI.render();
    requestApi($('#search-input-keyword').value)
      .then(videoData => {
        youtubeSearchResult.renderInitialVideoList(videoData);
      })
      .catch(({ message }) => {
        showSnackBar(message);
        skeletonUI.remove();
      });
  },
};
