import { STYLE_CLASS, SELECTOR_CLASS, YOUTUBE } from '../constants.js';

import BasicView from './BasicView.js';
import { $ } from 'c:/users/leesongwon/desktop/javascript-youtube-classroom/src/utils/queryselector.js';
export default class ModalView extends BasicView {
  constructor({
    $modal,
    $searchQueries,
    $searchContentVideoWrapper,
    $searchContentSavedVideoCount,
    $searchContentIntersector,
    $searchContentVideoNotFound,
  }) {
    super({
      $modal,
      $searchQueries,
      $searchContentVideoWrapper,
      $searchContentSavedVideoCount,
      $searchContentIntersector,
      $searchContentVideoNotFound,
    });
  }

  openModal() {
    this._element.$modal.classList.add(STYLE_CLASS.OPEN);
  }
  closeModal() {
    this._element.$modal.classList.remove(STYLE_CLASS.OPEN);
  }

  showSearchPrepartion() {
    this.hideElement(this._element.$searchContentVideoNotFound);
    this.#renderSkeletonItems();
  }

  renderSearchQueries(queries) {
    this.renderHTML(this._element.$searchQueries, this.#getSearchQueriesTemplate(queries));
  }

  renderSavedVideoCount(count) {
    this.renderHTML(this._element.$searchContentSavedVideoCount, count);
  }

  renderSearchedVideos(videos) {
    $();
    this.renderHTML(this._element.$searchContentVideoWrapper, this.#getSearchedVideoListTemplate(videos));
  }

  insertSearchedVideos(videos) {
    this.insertHTML(this._element.$searchContentVideoWrapper, this.#getSearchedVideoListTemplate(videos));
  }

  showNotFountImage() {
    this.showElement(this._element.$searchContentVideoNotFound);
  }

  showSearchContentIntersector() {
    this.showElement(this._element.$searchContentIntersector);
  }

  hideSearchContentIntersector() {
    this.hideElement(this._element.$searchContentIntersector);
  }

  hideSkeletons() {
    this.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
  }

  hideVideoSaveButton($button) {
    this.hideElement($button);
  }

  #renderSkeletonItems() {
    this.renderHTML(this._element.$searchContentVideoWrapper, this.#getSkeletonListTemplate());
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
    return videos.map(this.#getSearchedVideoTemplate).join('');
  }

  #getSearchedVideoTemplate(video) {
    return `
    <article class="${SELECTOR_CLASS.SEARCHED_CLIP} clip">
      <div class="clip__preview ">
        <img class="clip__thumbnail--in-modal" src="${video.thumbnail}" loading="lazy" />
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${video.videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
          class="clip__iframe"
        ></iframe>
      </div>
      <div class="clip__content pt-2 px-1">
        <h3>${video.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${video.channelTitle}
          </a>
          <div class="meta">
            <p>${video.publishedAt}</p>
          </div>
          <div class="d-flex justify-end ${video.isSaved ? 'removed' : ''}">
            <button class="btn ${SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON}"
              data-video-id="${video.videoId}"
            >⬇️ 저장</button>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
