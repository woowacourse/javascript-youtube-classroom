import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $searchResultVideoWrapper,
} from '../elements.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import controllerUtil from './controllerUtil.js';
import { prevSearchResultModel, searchQueryModel, watchedVideoModel, watchingVideoModel } from '../store.js';
import modalService from '../service/modalService.js';
import { layoutView, modalView, watchedVideoView, watchingVideoView } from '../view/index.js';
import { BROWSER_HASH, SELECTOR_CLASS, SNACKBAR_MESSAGE } from '../constants.js';
import watchingVideoService from '../service/watchingVideoService.js';

const modalController = {
  initEventListeners() {
    controllerUtil.setObserver($searchResultIntersector, onAdditionalVideosLoad);
    $searchResultVideoWrapper.addEventListener('click', onSearchedVideoSave);
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
  initSearchQueries() {
    modalView.renderSearchQueries(searchQueryModel.getItem());
  },
};

function onModalOpen() {
  const prevSearchedVideos = getProcessedVideos();
  if (prevSearchedVideos.length === 0) {
    return;
  }
  modalView.openModal();
  renderModalContents(prevSearchedVideos);
}

function onModalClose() {
  modalView.closeModal();
}

function onVideoSearch(event) {
  event.preventDefault();
  const inputQuery = $searchFormInput.value.trim();
  if (inputQuery === prevSearchResultModel.getItem().lastQuery || inputQuery === '') {
    return;
  }
  searchVideo(inputQuery);
}

function onAdditionalVideosLoad() {
  const { lastQuery, pageToken } = modalService.getPrevSearchInfo();
  loadAdditionalVideos(lastQuery, pageToken);
}

function onSearchedVideoSave({ button }) {
  if (!button.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }
  if (!watchingVideoService.isVideoCountUnderLimit()) {
    layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }
  saveSearcedVideo(button);
}

function renderModalContents(prevSearchedVideos) {
  modalView.renderSearchedVideos(prevSearchedVideos);
  modalView.showSearchResultIntersector();
  modalView.renderSavedVideoCount(getAllVideoCount());
}

function getAllVideoCount() {
  watchingVideoModel.getItem().length + watchedVideoModel.getItem().length;
}

function getProcessedVideos() {
  const videos = prevSearchResultModel.getItem().prevSearchedVideos;
  return modalService.getProcessedVideos(videos);
}

async function searchVideo(inputQuery) {
  modalView.showSearchPrepartion();
  const { videos, nextPageToken } = await getVideosByKeyword(inputQuery);
  if (videos.length === 0) {
    renderEmptySearchResult();
    return;
  }
  saveSearchInfo(inputQuery, nextPageToken, videos);
  showSearchResult(videos);
}

function renderEmptySearchResult() {
  modalView.hideSearchResultIntersector();
  modalView.showNotFountImage();
  modalView.hideSkeletons();
}

function saveSearchInfo(inputQuery, nextPageToken, videos) {
  modalService.saveSearchQuery(inputQuery);
  modalService.savePrevSearchInfo({ lastQuery: inputQuery, nextPageToken });
  modalService.savePrevSearchedVideos(videos);
}

function showSearchResult(videos) {
  modalView.hideSkeletons();
  modalView.renderSearchQueries(searchQueryModel.getItem());
  modalView.renderSearchedVideos(modalService.getProcessedVideos(videos));
  modalView.showSearchResultIntersector();
}

async function loadAdditionalVideos(lastQuery, pageToken) {
  const { videos, nextPageToken } = await getVideosByKeyword(lastQuery, pageToken);
  modalView.insertSearchedVideos(videos);
  modalService.savePrevSearchInfo({ nextPageToken });
}

function saveSearcedVideo(button) {
  if (watchingVideoService.isVideosEmpty()) {
    watchingVideoView.hideEmptyVideoImage();
    watchedVideoView.hideEmptyVideoImage();
  }
  watchingVideoService.pushNewVideo(button.dataset);
  if (controllerUtil.parseHash(location.hash) === BROWSER_HASH.WATCHING) {
    watchingVideoView.renderVideos(watchingVideoModel.getItem());
  }
  modalView.hideVideoSaveButton(button);
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
}

export default modalController;
