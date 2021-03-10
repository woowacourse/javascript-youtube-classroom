import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
  $videoWrapper,
  $emptyVideoImage,
  $snackbarWrapper,
} from '../elements.js';
import {
  STYLE_CLASS,
  SELECTOR_ID,
  SELECTOR_CLASS,
  ANIMATION_CLASS,
  SETTINGS,
} from '../constants.js';
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
  renderSearchedVideos(processedVideos) {
    //TODO : getVideoListTemplate -> searchedVideoListTemplate
    viewUtil.renderByElement(
      $searchResultVideoWrapper,
      getVideoListTemplate(processedVideos)
    );
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },
  insertSearchedVideos(processedVideos) {
    viewUtil.insertHTML(
      $searchResultVideoWrapper,
      getVideoListTemplate(processedVideos)
    );
  },
  showNotFountContent() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  },
  showSearchResultIntersector() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  },
  showEmptyVideoImage() {
    viewUtil.showElement($emptyVideoImage);
  },
  showMessage(message) {
    alert(message);
  },
  showSnackbar(message, isSuccess) {
    // TODO : make snackbar => 붙이고 => setTimeout 걸기
    // TODO : inserBy => insertTo
    const $snackbar = view.createSnackbar(message, isSuccess);
    viewUtil.insertElement($snackbarWrapper, $snackbar);
    setTimeout(() => {
      viewUtil.deleteElement($snackbarWrapper, $snackbar);
    }, SETTINGS.SNACKBAR_PERSISTENT_MILLISEC);
  },
  createSnackbar(message, isSuccess) {
    const $snackbar = document.createElement('div');
    $snackbar.className = `
      ${SELECTOR_CLASS.SNACKBAR} 
      ${STYLE_CLASS.SNACKBAR} 
      ${isSuccess ? STYLE_CLASS.SUCCESS : STYLE_CLASS.FAIL}
      ${ANIMATION_CLASS.FADE_IN_AND_OUT}
    `;
    $snackbar.innerText = message;
    return $snackbar;
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
  confirm(message) {
    return confirm(message);
  },
};

export default view;
