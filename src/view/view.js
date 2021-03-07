import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
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
    view.hideElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
    view.renderSkeletonItems();
  },
  renderVideoItems($element, videos) {
    $element.innerHTML = getVideoListTemplate(videos);
  },
  renderSelectedVideoItems($element, videos) {
    $element.innerHTML = getSelectedVideoListTemplate(videos);
  },
  renderSkeletonItems() {
    $searchResultVideoWrapper.innerHTML = getSkeletonListTemplate();
  },
  renderSearchQueries(queries) {
    $searchQueries.innerHTML = getSearchQueriesTemplate(queries);
  },
  renderSearchedVideos(processedVideos) {
    view.insertVideoItems($searchResultVideoWrapper, processedVideos);
    view.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },
  insertVideoItems($element, videos) {
    $element.insertAdjacentHTML('beforeend', getVideoListTemplate(videos));
  },
  insertSelectedVideoItems($element, videos) {
    $element.insertAdjacentHTML(
      'beforeend',
      getSelectedVideoListTemplate(videos)
    );
  },
  showNotFountContent() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  },
  hideSkeletons() {
    view.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
  },
  hideVideoSaveButton(target) {
    view.hideElement(target);
  },
};

export default view;
