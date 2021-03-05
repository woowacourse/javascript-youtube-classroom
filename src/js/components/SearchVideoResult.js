import {
  $,
  hideElement,
  showElement,
  getSearchVideoByKeyword,
  formatDateTime,
  renderSkeleton,
  removeSkeleton,
} from '../util/index.js';
import { NUM_OF_VIDEO_PER_FETCH } from '../constants/index.js';

export class SearchVideoResult {
  constructor({ searchKeywordHistoryManager, savedVideoManager }) {
    this.$container = $('.js-video-result-container');
    this.$wrapper = $('.js-video-result-wrapper');
    this.$notFoundImage = $('.js-not-found-image');

    this.searchKeywordHistoryManager = searchKeywordHistoryManager;
    this.savedVideoManager = savedVideoManager;
    this.searchKeywordHistoryManager.subscribe(this.reset.bind(this));
    this.searchKeywordHistoryManager.subscribe(this.fetchSearchResultData.bind(this));

    this.searchResultData = {};

    this.initEvent();
  }

  initEvent() {
    this.$container.addEventListener('scroll', this.handleContainerScroll.bind(this));
    this.$wrapper.addEventListener('click', this.handleSaveVideo.bind(this));
  }

  async handleContainerScroll({ target }) {
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
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
      this.savedVideoManager.saveVideo({
        id: target.dataset.videoId,
        isCompleted: false,
      });

      hideElement(target);
    }
  }

  setState({ searchResultData }) {
    this.searchResultData = searchResultData;
    this.render();
  }

  reset() {
    this.$wrapper.innerHTML = '';
  }

  makeTemplate({ id, snippet }) {
    return `
      <section class="video-wrapper mt-8">
        <article class="clip">
          <div class="preview-container">
            <iframe
              width="100%"
              height="118"
              src="https://www.youtube.com/embed/${id.videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="content-container pt-2 px-1">
            <h3>${snippet.title}</h3>
            <div>
              <a
                href="https://www.youtube.com/channel/${snippet.channelId}"
                target="_blank"
                class="channel-name mt-1"
              >
              ${snippet.channelTitle}
              </a>
              <div class="meta">
                <p>${formatDateTime(snippet.publishedAt)}</p>
              </div>
              <div class="d-flex justify-end">
                <button class="js-clip-save-button btn" data-video-id="${id.videoId}">⬇️ 저장</button>
              </div>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  render() {
    if (!this.$wrapper.hasChildNodes() && this.searchResultData.items.length === 0) {
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
