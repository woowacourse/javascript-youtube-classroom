import { requestVideoSearchApi } from '../domain/requestVideoSearchApi';
import { debounce } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeletonUI } from './skeletonUI';
import { videoSearchResult } from './videoSearchReulst';

export const videoSearchForm = {
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
    videoSearchResult.resetVideoList();
    skeletonUI.render();
    requestVideoSearchApi($('#search-input-keyword').value)
      .then(videoData => {
        videoSearchResult.renderInitialVideoList(videoData);
      })
      .catch(({ message }) => {
        showSnackBar(message);
        skeletonUI.remove();
      });
  },
};
