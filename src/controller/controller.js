import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $searchResultVideoWrapper,
  $videoWrapper,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import prevSearchResult from '../storage/prevSearchResult.js';
import searchQuery from '../storage/searchQuery.js';
import videoToWatch from '../storage/videoToWatch.js';
import { SETTINGS, SELECTOR_CLASS, ALERT_MESSAGE } from '../constants.js';
import controllerUtil from './controllerUtil.js';

function onVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipCheck(target);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onClipDelete(target);
    console.log(target);
    return;
  }
}

function onClipCheck(button) {
  const videoId = button.dataset.videoId;
  controllerUtil.sendVideoToWatchedVideos(videoId);
  controller.loadVideos();
}

function onClipDelete(button) {
  const videoId = button.dataset.videoId;
  videoToWatch.popVideoByVideoId(videoId);
  controller.loadVideos();
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
    view.showMessage(ALERT_MESSAGE.SAVE_LIMIT_EXCEEDED);
    return;
  }

  if (videoToWatch.getVideos().length === 0) {
    view.hideEmptyVideoImage();
  }
  view.hideVideoSaveButton(target);
  videoToWatch.pushVideo(controllerUtil.getNewVideo(target.dataset));
  view.renderSelectedVideoItems(videoToWatch.getVideos());
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
    $videoWrapper.addEventListener('click', onVideoInteract);
  },
  initSearchQueries() {
    view.renderSearchQueries(searchQuery.getQueries());
  },
  // TODO: Selected -> Watching 으로 단어 변경
  loadVideos() {
    const videosToWatch = videoToWatch.getVideos();
    if (videosToWatch.length === 0) {
      view.showEmptyVideoImage();
    }
    view.renderSelectedVideoItems(videosToWatch);
  },
};

export default controller;
