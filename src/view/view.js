import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
  $savedVideoCount,
  $watchingVideoWrapper,
  $emptyVideoToWatch,
  $snackbarWrapper,
  $watchedVideoWrapper,
  $emptyWatchedVideo,
  $nav,
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
      $watchingVideoWrapper,
      getSelectedVideoListTemplate(videos)
    );
  },

  renderWatchedVideo(videos) {
    viewUtil.renderByElement(
      $watchedVideoWrapper,
      getSelectedVideoListTemplate(videos, true)
    );
  },

  renderWatchingVideo(videos) {
    viewUtil.renderByElement(
      $watchingVideoWrapper,
      getSelectedVideoListTemplate(videos)
    );
  },

  eraseWatchingVideo() {
    viewUtil.renderByElement($watchingVideoWrapper, '');
  },

  eraseWatchedVideo() {
    viewUtil.renderByElement($watchedVideoWrapper, '');
  },

  renderSearchQueries(queries) {
    viewUtil.renderByElement($searchQueries, getSearchQueriesTemplate(queries));
  },

  renderSavedVideoCount(count) {
    $savedVideoCount.innerHTML = count;
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

  showNotFoundContent() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  },

  showSearchResultIntersector() {
    viewUtil.showElementBySelector(`#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`);
  },
  showEmptyVideoToWatch() {
    viewUtil.showElement($emptyVideoToWatch);
  },
  showEmptyWatchedVideo() {
    viewUtil.showElement($emptyWatchedVideo);
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
  // TODO : view 에서 modal view 분리
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

  hideEmptyVideoToWatch() {
    viewUtil.hideElement($emptyVideoToWatch);
  },

  hideEmptyWatchedVideo() {
    viewUtil.hideElement($emptyWatchedVideo);
  },

  highlightNavButton(hash) {
    $nav.querySelectorAll(`.${SELECTOR_CLASS.NAV_BUTTON}`).forEach($button => {
      if ($button.dataset.id === hash) {
        $button.classList.add(STYLE_CLASS.CLICKED);
        return;
      }
      $button.classList.remove(STYLE_CLASS.CLICKED);
    });
  },

  confirm(message) {
    return confirm(message);
  },

};

export default view;
