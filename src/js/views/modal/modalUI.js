import template from './template.js';
import { $, $$ } from '../../utils/querySelector.js';
import videoStorage from '../../localStorage/videoStorage.js';

const modalUI = {
  resetVideoList() {
    $('.video-list').replaceChildren();
  },

  renderSkeletonUI() {
    $('.search-result').classList.remove('search-result--no-result');
    $('.no-result').hidden = true;
    $('.video-list').classList.remove('hide');
    $('.video-list').insertAdjacentHTML('beforeEnd', template.skeletonUI.repeat(10));
  },

  removeSkeletonUI() {
    $$('.skeleton').forEach(element => element.remove());
  },

  removeSavedVideoButton() {
    const savedVideos = videoStorage.getSavedVideos();
    if (savedVideos) {
      savedVideos.forEach(video => {
        const isSavedVideo = $('.video-list').lastElementChild.dataset.videoId === video.id;
        if (isSavedVideo) {
          $('.video-list').lastElementChild.lastElementChild.disabled = true;
        }
      });
    }
  },

  renderVideoItems({ items }) {
    this.removeSkeletonUI();
    items.forEach(item => {
      $('.video-list').insertAdjacentHTML('beforeEnd', template.videoItem(item));
      this.removeSavedVideoButton();
    });
  },

  renderNoResult() {
    this.removeSkeletonUI();
    $('.search-result').classList.add('search-result--no-result');
    $('.video-list').classList.add('hide');
    $('.no-result').hidden = false;
    if ($('.no-result').childElementCount === 0) {
      $('.no-result').insertAdjacentHTML('beforeEnd', template.nothingFoundImage);
    }
  },

  renderSearchResult(response) {
    response
      .then(searchResults => {
        if (searchResults.items.length === 0) {
          this.renderNoResult();
          return;
        }
        this.renderVideoItems(searchResults);
      })
      .catch(error => alert(error.message))
      .finally(() => {
        $('.suggestion').hidden = true;
        $('#suggestion-list').replaceChildren();
      });
  },

  renderAdditionalSearchResult(response) {
    response.then(searchResults => {
      this.renderVideoItems(searchResults);
    });
  },
};

export default modalUI;
