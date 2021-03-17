import {
  $,
  hideElement,
  showElement,
  getSearchVideoByKeyword,
  renderSkeleton,
  removeSkeleton,
  showSnackbar,
  setLazyLoading,
} from '../util/index.js';
import { NUM_OF_VIDEO_PER_FETCH, getVideoTemplate, SNACKBAR_MESSAGE } from '../constants/index.js';

export class SearchVideoResult {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$container = $('.js-video-result-container');
    this.$wrapper = $('.js-video-result-wrapper');
    this.$notFoundImage = $('.js-not-found-image');
    this.$scrollObserver = $('.js-scroll-observer');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.searchKeywordHistoryManager.subscribe(this.reset.bind(this));
    this.searchKeywordHistoryManager.subscribe(this.render.bind(this));
    this.savedVideoManager = savedVideoManager;

    this.searchResultData = {};
    this.nextPageToken = '';

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

    this.observer.observe(this.$scrollObserver);
  }

  async handleScroll() {
    try {
      this.render();
    } catch (e) {
      console.error(e);
      showSnackbar(SNACKBAR_MESSAGE.API_REQUEST_FAILURE);
    }
  }

  async fetchSearchResultData() {
    try {
      const searchResultData = await getSearchVideoByKeyword(
        this.searchKeywordHistoryManager.getLastKeyword(),
        this.nextPageToken
      );
      this.setState({ searchResultData });
    } catch (e) {
      console.error(e);
      showSnackbar(SNACKBAR_MESSAGE.API_REQUEST_FAILURE);
      this.setState({ searchResultData: { nextPageToken: '', items: [] } });
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

  async render() {
    hideElement(this.$notFoundImage);
    renderSkeleton(this.$wrapper, NUM_OF_VIDEO_PER_FETCH);
    await this.fetchSearchResultData();
    removeSkeleton(this.$wrapper);

    if (this.$wrapper.querySelectorAll('.clip').length === 0 && this.searchResultData.items.length === 0) {
      showElement(this.$notFoundImage);

      return;
    }

    this.$wrapper.insertAdjacentHTML(
      'beforeend',
      this.searchResultData.items.map(item => this.makeTemplate(item)).join('')
    );
    showElement(this.$scrollObserver);
    setLazyLoading(this.$container);
  }

  setState({ searchResultData }) {
    this.searchResultData = searchResultData;
    this.nextPageToken = searchResultData.nextPageToken;
  }

  reset() {
    this.$container.scrollTo(0, 0);
    this.$wrapper.innerHTML = '';
    hideElement(this.$scrollObserver);
  }
}
