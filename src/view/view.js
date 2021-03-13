import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
  $videoWrapper,
  $savedVideoCount,
} from '../elements.js';
import { STYLE_CLASS, SELECTOR_ID, SELECTOR_CLASS } from '../constants.js';
import {
  getVideoListTemplate,
  getSkeletonListTemplate,
  getSelectedVideoListTemplate,
  getSearchQueriesTemplate,
} from './templates.js';
import viewUtil from './viewUtil.js';

const view = {
  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  },

  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
  },

  initSearchResult() {
    viewUtil.hideElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
    view.renderSkeletonItems();
  },

  renderSelectedVideoItems(videos) {
    $videoWrapper.innerHTML = getSelectedVideoListTemplate(videos);
  },

  renderSkeletonItems() {
    $searchResultVideoWrapper.innerHTML = getSkeletonListTemplate();
  },

  renderSearchQueries(queries) {
    $searchQueries.innerHTML = getSearchQueriesTemplate(queries);
  },

  renderSavedVideoCount(count) {
    $savedVideoCount.innerHTML = count;
  },

  renderSearchedVideos(processedVideos) {
    view.insertVideoItems(processedVideos);
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },

  insertVideoItems(videos) {
    $searchResultVideoWrapper.insertAdjacentHTML(
      'beforeend',
      getVideoListTemplate(videos)
    );
  },

  showNotFountContent() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  },

  showSearchResultIntersector() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },

  showMessage(message) {
    alert(message);
  },

  hideSkeletons() {
    viewUtil.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
  },

  hideVideoSaveButton(target) {
    viewUtil.hideElement(target);
  },

};

export default view;
