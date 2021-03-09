import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
  $videoWrapper,
  $savedVideoCount,
  $emptyVideoImage,
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
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`);
  },

  insertVideoItems(videos) {
    $searchResultVideoWrapper.insertAdjacentHTML(
      'beforeend',
      getVideoListTemplate(videos)
    );
  },

  showNotFoundContent() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  },

  showSearchResultIntersector() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`);
  },
  showEmptyVideoImage() {
    viewUtil.showElement($emptyVideoImage);
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
  hideEmptyVideoImage() {
    viewUtil.hideElement($emptyVideoImage);
  },
};

export default view;
