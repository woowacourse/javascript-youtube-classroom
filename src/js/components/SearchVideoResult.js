import {
  $,
  hideElement,
  showElement,
  getSearchVideoByKeyword,
  renderSkeleton,
  removeSkeleton,
  showSnackbar,
} from '../util/index.js';
import { NUM_OF_VIDEO_PER_FETCH, getVideoTemplate, SNACKBAR_MESSAGE } from '../constants/index.js';

export class SearchVideoResult {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$container = $('.js-video-result-container');
    this.$wrapper = $('.js-video-result-wrapper');
    this.$notFoundImage = $('.js-not-found-image');
    this.$intersectionObserver = $('.js-intersection-observer');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.searchKeywordHistoryManager.subscribe(this.reset.bind(this));
    this.searchKeywordHistoryManager.subscribe(this.fetchSearchResultData.bind(this));
    this.savedVideoManager = savedVideoManager;

    this.searchResultData = {};

    this.initEvent();
    this.initIntersectionObeserver();
  }

  initEvent() {
    this.$wrapper.addEventListener('click', this.handleSaveVideo.bind(this));
  }

  initIntersectionObeserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleScroll();
        }
      });
    });

    this.observer.observe(this.$intersectionObserver);
  }

  async handleScroll() {
    try {
      renderSkeleton(this.$wrapper, NUM_OF_VIDEO_PER_FETCH);
      const searchResultData = await getSearchVideoByKeyword(
        this.searchKeywordHistoryManager.getLastKeyword(),
        this.searchResultData.nextPageToken
      );
      removeSkeleton(this.$wrapper);

      this.setState({ searchResultData });
    } catch (e) {
      console.error(e);
      showSnackbar(SNACKBAR_MESSAGE.API_REQUEST_FAILURE);
    }
  }

  async fetchSearchResultData() {
    try {
      renderSkeleton(this.$wrapper, NUM_OF_VIDEO_PER_FETCH);
      const searchResultData = await getSearchVideoByKeyword(this.searchKeywordHistoryManager.getLastKeyword());
      removeSkeleton(this.$wrapper);
      this.setState({ searchResultData });
    } catch (e) {
      console.error(e);
      showSnackbar(SNACKBAR_MESSAGE.API_REQUEST_FAILURE);
    }
  }

  handleSaveVideo({ target }) {
    if (!target.classList.contains('js-clip-save-button')) {
      return;
    }

    if (this.savedVideoManager.saveVideo(target.dataset.videoId)) {
      showSnackbar(SNACKBAR_MESSAGE.SAVE_SUCCESS);
      target.disabled = true;
    } else {
      showSnackbar(SNACKBAR_MESSAGE.OVER_MAX_NUM_OF_SAVED_VIDEO);
    }
  }

  setState({ searchResultData }) {
    this.searchResultData = searchResultData;
    this.render();
  }

  reset() {
    this.$container.scrollTo(0, 0);
    this.$wrapper.innerHTML = '';
    hideElement(this.$intersectionObserver);
  }

  makeTemplate(videoData) {
    return getVideoTemplate({
      videoData,
      buttonTemplate: this.makeSaveButtonTemplete(videoData.id.videoId),
    });
  }

  makeSaveButtonTemplete(videoId) {
    return `
      <div class="mb-6 d-flex justify-end">
        <button type="button" class="js-clip-save-button btn" data-video-id="${videoId}" ${
      this.savedVideoManager.getSavedVideoIdList().includes(videoId) ? 'disabled' : ''
    }>⬇️ 저장 </button>
      </div>
    `;
  }

  render() {
    if (this.$wrapper.querySelectorAll('.clip').length === 0 && this.searchResultData.items.length === 0) {
      showElement(this.$notFoundImage);

      return;
    }

    hideElement(this.$notFoundImage);
    this.$wrapper.insertAdjacentHTML(
      'beforeend',
      this.searchResultData.items.map(item => this.makeTemplate(item)).join('')
    );
    showElement(this.$intersectionObserver);
  }
}
