import {
  $watchingVideoButton,
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchResultIntersector,
  $searchResultVideoWrapper,
  $modal,
  $watchingVideoWrapper,
  $watchedVideoWrapper,
} from '../elements.js';
import watchingVideoView from '../view/watchingVideoView.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import prevSearchResult from '../storage/prevSearchResult.js';
import watchingVideo from '../storage/watchingVideo.js';
import {
  SETTINGS,
  SELECTOR_CLASS,
  CONFIRM_MESSAGE,
  SELECTOR_ID,
  SNACKBAR_MESSAGE,
  BROWSER_HASH,
} from '../constants.js';
import controllerUtil from './controllerUtil.js';
import watchedVideo from '../storage/watchedVideo.js';
import modalView from '../view/modalView.js';
import watchedVideoView from '../view/watchedVideoView.js';
import viewUtil from '../view/viewUtil.js';

function onWatchingVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipCheck(target);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onWatchingVideoDelete(target);
    return;
  }
}

function onWatchedVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipUnCheck(target);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onWatchedVideoDelete(target);
    return;
  }
}

function onClipCheck(button) {
  const videoId = button.dataset.videoId;
  controllerUtil.sendWatchingVideoedVideos(videoId);
  controller.loadWatchingVideos();
  viewUtil.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_CHECK_SUCCESS, true);
}

function onClipUnCheck(button) {
  const videoId = button.dataset.videoId;
  controllerUtil.sendWatchingVideoingVideos(videoId);
  controller.loadWatchedVideos();
  viewUtil.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_CHECK_SUCCESS, true);
}

function onWatchingVideoDelete(button) {
  if (!viewUtil.confirm(CONFIRM_MESSAGE.WATCHING_VIDEO_DELETE)) {
    return;
  }
  const videoId = button.dataset.videoId;
  watchingVideo.popVideoByVideoId(videoId);
  controller.loadWatchingVideos();
  viewUtil.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_DELETE_SUCCESS, true);
}

function onWatchedVideoDelete(button) {
  if (!viewUtil.confirm(CONFIRM_MESSAGE.WATCHED_VIDEO_DELETE)) {
    return;
  }
  const videoId = button.dataset.videoId;
  watchedVideo.popVideoByVideoId(videoId);
  controller.loadWatchedVideos();
  viewUtil.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_DELETE_SUCCESS, true);
}

async function onAdditionalVideosLoad() {
  const { videos, nextPageToken } = await getVideosByKeyword(
    prevSearchResult.getLastQuery(),
    prevSearchResult.getNextPageToken()
  );
  controllerUtil.loadAdditionalVideos(videos);
  prevSearchResult.setNextPageToken(nextPageToken);
}

function onModalOpen() {
  controllerUtil.highlightNavButton($searchButton);
  const savedVideoCount = watchingVideo.getVideos().length;
  modalView.openModal();
  const videos = prevSearchResult.getSearchedVideos();
  watchingVideoView.renderSavedVideoCount(savedVideoCount);
  modalView.openModal();

  if (videos.length === 0) {
    return;
  }
  controllerUtil.loadPrevSearchedVideos(videos);
  controllerUtil.savePrevSearchInfo(
    prevSearchResult.getLastQuery(),
    prevSearchResult.getNextPageToken()
  );
}

function onModalClose() {
  controllerUtil.highlightNavButton($watchingVideoButton);
  modalView.closeModal();
}

async function onVideoSearch(event) {
  event.preventDefault();
  const input = event.target[`${SELECTOR_ID.SEARCH_FORM_INPUT}`].value.trim();

  if (input === prevSearchResult.getLastQuery()) {
    return;
  }
  if (input === '') {
    return;
  }
  modalView.initSearchResult();
  const { videos, nextPageToken } = await getVideosByKeyword(input);

  if (videos.length === 0) {
    modalView.showNotFoundImage();
    return;
  }
  modalView.hideSkeletons();
  controllerUtil.pushSearchQuery(input);
  controllerUtil.loadSearchResult(videos);

  controllerUtil.savePrevSearchInfo(input, nextPageToken);
  prevSearchResult.setVideos(videos);
}

function onWatchingVideoSave({ target }) {
  if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }

  if (watchingVideo.getVideos().length === SETTINGS.MAX_SAVE_COUNT) {
    viewUtil.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }

  if (watchingVideo.getVideos().length === 0) {
    watchingVideoView.hideEmptyWatchingVideo();
    watchedVideoView.hideEmptyWatchedVideo();
  }

  modalView.hideVideoSaveButton(target);
  watchingVideo.pushVideo(controllerUtil.getNewVideo(target.dataset));
  const videos = watchingVideo.getVideos();
  watchingVideoView.renderSavedVideoCount(videos.length);

  if (parseHash(location.hash) === BROWSER_HASH.WATCHING) {
    watchingVideoView.renderWatchingVideoItems(videos);
  }
  viewUtil.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
}

function onWatchedVideoShow() {
  const videos = watchedVideo.getVideos();
  watchingVideoView.eraseWatchingVideo();
  watchingVideoView.hideEmptyWatchingVideo();
  if (videos.length === 0) {
    watchedVideoView.showEmptyWatchedVideo();
    return;
  }
  watchedVideoView.renderWatchedVideo(videos);
}

function onWatchingVideoShow() {
  const videos = watchingVideo.getVideos();
  watchedVideoView.eraseWatchedVideo();
  watchedVideoView.hideEmptyWatchedVideo();
  if (videos.length === 0) {
    watchingVideoView.showEmptyWatchingVideo();
    return;
  }
  watchingVideoView.renderWatchingVideo(videos);
}

function routeByHash() {
  const hash = parseHash(location.hash);
  viewUtil.highlightNavButton(hash);
  if (hash === BROWSER_HASH.WATCHING) {
    onWatchingVideoShow();
    return;
  }
  if (hash === BROWSER_HASH.WATCHED) {
    onWatchedVideoShow();
    return;
  }
  onWatchingVideoShow();
}

function parseHash(hash) {
  if (hash === '') {
    return BROWSER_HASH.WATCHING;
  }
  return hash.substr(1);
}

const controller = {
  initEventListeners() {
    controllerUtil.setObserver(
      $searchResultIntersector,
      onAdditionalVideosLoad
    );
    $searchResultVideoWrapper.addEventListener('click', onWatchingVideoSave);
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
    $modal.addEventListener('click', (event) => {
      if (event.target.id === SELECTOR_ID.MODAL) {
        onModalClose();
      }
    });

    $searchButton.addEventListener('click', onModalOpen);
    $watchingVideoWrapper.addEventListener('click', onWatchingVideoInteract);
    $watchedVideoWrapper.addEventListener('click', onWatchedVideoInteract);
    window.onhashchange = routeByHash;
    window.onload = routeByHash;
  },

  initSearchQueries() {
    modalView.renderSearchQueriesuery.getQueries();
  },
  loadWatchingVideos() {
    const watchingVideos = watchingVideo.getVideos();
    if (watchingVideos.length === 0) {
      watchingVideoView.showEmptyWatchingVideo();
      watchedVideoView.hideEmptyWatchedVideo();
    }
    watchingVideoView.renderWatchingVideoItems(watchingVideos);
  },

  loadWatchedVideos() {
    const watchedVideos = watchedVideo.getVideos();
    if (watchedVideos.length === 0) {
      watchingVideoView.hideEmptyWatchingVideo();
      watchedVideoView.showEmptyWatchedVideo();
    }
    watchedVideoView.renderWatchedVideo(watchedVideos);
  },
};

export default controller;
