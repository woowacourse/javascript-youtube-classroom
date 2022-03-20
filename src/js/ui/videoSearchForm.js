import { requestVideoSearchApi } from '../domain/requestVideoSearchApi';
import { debounce } from '../utils/common';
import { $, showSnackBar } from '../utils/dom';
import { skeletonUI } from './skeletonUI';
import { videoSearchResult } from './videoSearchReulst';

export const videoSearchForm = {
  $searchForm: $('#search-form'),
  $searchInputKeyword: $('#search-input-keyword'),

  preventFormDeafultEvent() {
    this.$searchForm.addEventListener('submit', this.handleFormDefaultEvent);
  },

  addSearchEvent() {
    this.$searchForm.addEventListener('submit', debounce(this.handleSubmit.bind(this), 300));
  },

  handleFormDefaultEvent(e) {
    e.preventDefault();
  },

  handleSubmit() {
    videoSearchResult.resetVideoList();
    skeletonUI.render();
    requestVideoSearchApi(this.$searchInputKeyword.value)
      .then(videoData => {
        videoSearchResult.renderInitialVideoList(videoData);
      })
      .catch(({ message }) => {
        showSnackBar(message);
        skeletonUI.remove();
      });
  },
};
