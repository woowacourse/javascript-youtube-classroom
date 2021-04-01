import {
  STYLE_CLASS,
  SELECTOR_ID,
  SELECTOR_CLASS,
  YOUTUBE,
} from '../constants.js';
import {
  $modal,
  $searchQueries,
  $searchResultVideoWrapper,
  $savedVideoCount,
} from '../elements.js';
import BasicView from './BasicView.js';
import { GetVideoIframeMixin } from './mixin.js';
export default class ModalView extends GetVideoIframeMixin(BasicView) {
  constructor() {
    super();
  }

  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  }

  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
  }

  initSearchEnv() {
    this.hideElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
    this.#renderSkeletonItems();
  }

  renderSearchQueries(queries) {
    this.renderHTML($searchQueries, this.#getSearchQueriesTemplate(queries));
  }

  renderSavedVideoCount(count) {
    this.renderHTML($savedVideoCount, count);
  }

  renderSearchedVideos(processedVideos) {
    this.renderHTML(
      $searchResultVideoWrapper,
      this.#getSearchedVideoListTemplate(processedVideos)
    );
    this.showElementBySelector(`#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`);
  }

  insertSearchedVideos(processedVideos) {
    this.insertHTML(
      $searchResultVideoWrapper,
      this.#getSearchedVideoListTemplate(processedVideos)
    );
  }

  showNotFoundImage() {
    this.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  }

  showSearchResultIntersector() {
    this.showElementBySelector(`#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`);
  }

  hideSkeletons() {
    this.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
  }

  hideVideoSaveButton($button) {
    this.hideElement($button);
  }

  #renderSkeletonItems() {
    this.renderHTML($searchResultVideoWrapper, this.#getSkeletonListTemplate());
  }

  #getSkeletonListTemplate() {
    return `
      <div class="${SELECTOR_CLASS.SKELETON} skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>
    `.repeat(YOUTUBE.MAX_RESULT_COUNT);
  }

  #getSearchQueriesTemplate(queries) {
    return queries.map(this.#getSearchQueryTemplate).join('');
  }

  #getSearchQueryTemplate(query) {
    return `
      <a class="${SELECTOR_CLASS.SEARCH_QUERIES_CHIP} search-queries__chip mr-2">${query}</a>
    `;
  }

  #getSearchedVideoListTemplate(videos) {
    return videos.map(video => this.#getSearchedVideoTemplate(video)).join('');
  }

  #getSearchedVideoTemplate(videoItem) {
    return `
    <article class="${SELECTOR_CLASS.SEARCHED_CLIP} clip">
      <div class="clip__preview">
        ${this._getIframe(videoItem)}
      </div>
      <div class="clip__content pt-2 px-1">
        <h3>${videoItem.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${videoItem.channelTitle}
          </a>
          <div class="meta">
            <p>${videoItem.publishedAt}</p>
          </div>
          <div class="d-flex justify-end ${videoItem.isSaved ? 'removed' : ''}">
            <button class="btn ${SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON}"
              data-video-id="${videoItem.videoId}"
              data-title="${videoItem.title}"
              data-channel-title="${videoItem.channelTitle}"
              data-published-at="${videoItem.publishedAt}"
              data-thumbnail-url="${videoItem.thumbnailUrl}"
            aria-label="볼 영상으로 저장">⬇️ 저장</button>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
