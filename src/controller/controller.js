import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $searchResultVideoWrapper,
  $watchingVideoWrapper,
  $watchedVideoWrapper,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import prevSearchResult from '../storage/prevSearchResult.js';
import searchQuery from '../storage/searchQuery.js';
import videoToWatch from '../storage/videoToWatch.js';
import {
  SETTINGS,
  SELECTOR_CLASS,
  CONFIRM_MESSAGE,
  SNACKBAR_MESSAGE,
  BROWSER_HASH,
} from '../constants.js';
import controllerUtil from './controllerUtil.js';
import watchedVideo from '../storage/watchedVideo.js';

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
  controllerUtil.sendVideoToWatchedVideos(videoId);
  controller.loadWatchingVideos();
  view.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_CHECK_SUCCESS, true);
}

function onClipUnCheck(button) {
  const videoId = button.dataset.videoId;
  controllerUtil.sendVideoToWatchingVideos(videoId);
  controller.loadWatchedVideos();
  view.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_CHECK_SUCCESS, true);
}

function onWatchingVideoDelete(button) {
  if (!view.confirm(CONFIRM_MESSAGE.WATCHING_VIDEO_DELETE)) {
    return;
  }
  const videoId = button.dataset.videoId;
  videoToWatch.popVideoByVideoId(videoId);
  controller.loadWatchingVideos();
  view.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_DELETE_SUCCESS, true);
}

function onWatchedVideoDelete(button) {
  if (!view.confirm(CONFIRM_MESSAGE.WATCHED_VIDEO_DELETE)) {
    return;
  }
  const videoId = button.dataset.videoId;
  watchedVideo.popVideoByVideoId(videoId);
  controller.loadWatchedVideos();
  view.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_DELETE_SUCCESS, true);
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
  view.openModal();
  const videos = prevSearchResult.getSearchedVideos();
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
  view.closeModal();
}

async function onVideoSearch(event) {
  event.preventDefault();
  const input = $searchFormInput.value.trim();
  if (input === prevSearchResult.getLastQuery()) {
    return;
  }
  if (input === '') {
    return;
  }
  view.initSearchResult();
  const { videos, nextPageToken } = await getVideosByKeyword(input);
  if (videos.length === 0) {
    view.showNotFountContent();
    return;
  }
  view.hideSkeletons();
  controllerUtil.pushSearchQuery(input);
  controllerUtil.loadSearchResult(videos);

  controllerUtil.savePrevSearchInfo(input, nextPageToken);
  prevSearchResult.setVideos(videos);
}

function onSelectedVideoSave({ target }) {
  if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }
  if (videoToWatch.getVideos().length === SETTINGS.MAX_SAVE_COUNT) {
    view.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }

  if (videoToWatch.getVideos().length === 0) {
    view.hideEmptyVideoToWatch();
    view.hideEmptyWatchedVideo();
  }
  view.hideVideoSaveButton(target);
  videoToWatch.pushVideo(controllerUtil.getNewVideo(target.dataset));
  if (parseHash(location.hash) === BROWSER_HASH.WATCHING) {
    view.renderSelectedVideoItems(videoToWatch.getVideos());
  }
  view.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
}

function onWatchedVideoShow() {
  const videos = watchedVideo.getVideos();
  view.eraseWatchingVideo();
  view.hideEmptyVideoToWatch();
  if (videos.length === 0) {
    view.showEmptyWatchedVideo();
    return;
  }
  view.renderWatchedVideo(videos);
}

function onWatchingVideoShow() {
  const videos = videoToWatch.getVideos();
  view.eraseWatchedVideo();
  view.hideEmptyWatchedVideo();
  if (videos.length === 0) {
    view.showEmptyVideoToWatch();
    return;
  }
  view.renderWatchingVideo(videos);
}

function routeByHash() {
  const hash = parseHash(location.hash);
  view.highlightNavButton(hash);
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
    $searchResultVideoWrapper.addEventListener('click', onSelectedVideoSave);
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
    $watchingVideoWrapper.addEventListener('click', onWatchingVideoInteract);
    $watchedVideoWrapper.addEventListener('click', onWatchedVideoInteract);
    window.onhashchange = routeByHash;
    window.onload = routeByHash;
  },
  initSearchQueries() {
    view.renderSearchQueries(searchQuery.getQueries());
  },
  // TODO: Selected -> Watching 으로 단어 변경
  loadWatchingVideos() {
    const videosToWatch = videoToWatch.getVideos();
    if (videosToWatch.length === 0) {
      view.showEmptyVideoToWatch();
      view.hideEmptyWatchedVideo();
    }
    view.renderSelectedVideoItems(videosToWatch);
  },
  loadWatchedVideos() {
    const watchedVideos = watchedVideo.getVideos();
    if (watchedVideos.length === 0) {
      view.hideEmptyVideoToWatch();
      view.showEmptyWatchedVideo();
    }
    view.renderWatchedVideo(watchedVideos);
  },
};

export default controller;
