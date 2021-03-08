import {
  $,
  hideElement,
  showElement,
  getSearchVideoByKeyword,
  renderSkeleton,
  removeSkeleton,
  throttle,
} from '../util/index.js';
import { NUM_OF_VIDEO_PER_FETCH, SCROLL_THRTOTTLE_DELAY, getVideoTemplate } from '../constants/index.js';

export class SearchVideoResult {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$container = $('.js-video-result-container');
    this.$wrapper = $('.js-video-result-wrapper');
    this.$notFoundImage = $('.js-not-found-image');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.searchKeywordHistoryManager.subscribe(this.reset.bind(this));
    this.searchKeywordHistoryManager.subscribe(this.fetchSearchResultData.bind(this));
    this.savedVideoManager = savedVideoManager;

    this.searchResultData = {};

    this.initEvent();
  }

  initEvent() {
    this.$container.addEventListener('scroll', this.throttleScroll.bind(this));
    this.$wrapper.addEventListener('click', this.handleSaveVideo.bind(this));
  }

  throttleScroll({ target }) {
    throttle(this.handleContainerScroll.bind(this, target), SCROLL_THRTOTTLE_DELAY);
  }

  async handleContainerScroll(target) {
    if (target.scrollTop === target.scrollHeight - target.offsetHeight) {
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
      }
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
      // TODO: 오류났음 보여주는 메세지 띄우기
    }
  }

  handleSaveVideo({ target }) {
    if (target.classList.contains('js-clip-save-button')) {
      this.savedVideoManager.saveVideo(target.dataset.videoId);

      target.disabled = true;
    }
  }

  setState({ searchResultData }) {
    this.searchResultData = searchResultData;
    this.render();
  }

  reset() {
    this.$container.scrollTo(0, 0);
    this.$wrapper.innerHTML = '';
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
  }
}
