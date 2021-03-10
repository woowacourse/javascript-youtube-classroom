import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
} from '../elements.js';
import { STYLE_CLASS, SELECTOR_ID, SELECTOR_CLASS } from '../constants.js';
import {
  getSkeletonListTemplate,
  getSearchQueriesTemplate,
  getVideoListTemplate,
} from './templates.js';
import viewUtil from './viewUtil.js';

const modalView = {
  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  },
  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
  },
  initSearchResult() {
    viewUtil.hideElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
    modalView.renderSkeletonItems();
  },
  renderSkeletonItems() {
    viewUtil.renderHTML($searchResultVideoWrapper, getSkeletonListTemplate());
  },
  renderSearchQueries(queries) {
    viewUtil.renderHTML($searchQueries, getSearchQueriesTemplate(queries));
  },
  insertSearchedVideos(processedVideos) {
    viewUtil.insertHTML(
      $searchResultVideoWrapper,
      getVideoListTemplate(processedVideos)
    );
  },
  showNotFountImage() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  },
  showSearchResultIntersector() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },
  hideSkeletons() {
    viewUtil.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
  },
  hideVideoSaveButton(target) {
    viewUtil.hideElement(target);
  },
};

export default modalView;
