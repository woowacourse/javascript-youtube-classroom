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
    viewUtil.renderByElement(
      $searchResultVideoWrapper,
      getSkeletonListTemplate()
    );
  },
  renderSelectedVideoItems(videos) {
    viewUtil.renderByElement(
      $videoWrapper,
      getSelectedVideoListTemplate(videos)
    );
  },

  renderSearchQueries(queries) {
    viewUtil.renderByElement($searchQueries, getSearchQueriesTemplate(queries));
  },

  renderSavedVideoCount(count) {
    $savedVideoCount.innerHTML = count;
  },

  renderSearchedVideos(processedVideos) {
<<<<<<< HEAD
    view.insertVideoItems(processedVideos);
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`);
  },

  insertVideoItems(videos) {
    $searchResultVideoWrapper.insertAdjacentHTML(
      'beforeend',
      getVideoListTemplate(videos)
=======
    //TODO : getVideoListTemplate -> searchedVideoListTemplate
    viewUtil.renderByElement(
      $searchResultVideoWrapper,
      getVideoListTemplate(processedVideos)
    );
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },
  insertSearchedVideos(processedVideos) {
    viewUtil.insertByElement(
      $searchResultVideoWrapper,
      getVideoListTemplate(processedVideos)
>>>>>>> a0ff67b... feat: 쓰레기통 버튼으로 저장된 리스트에서 삭제할 수 있다.
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
