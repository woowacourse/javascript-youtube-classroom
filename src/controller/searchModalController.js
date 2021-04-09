import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchContentIntersector,
  $searchContentVideoWrapper,
} from '../elements.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import controllerUtil from './controllerUtil.js';
import { prevSearchResultModel, searchQueryModel, savedVideoModel, searchedVideoModel } from '../store.js';
import prevSearchInfoService from '../service/prevSearchInfoService.js';
import { layoutView, searchModalView } from '../view/index.js';
import { SELECTOR_CLASS, SNACKBAR_MESSAGE } from '../constants.js';
import savedVideoService from '../service/savedVideoService.js';
import searchedVideoService from '../service/searchedVideoService';
import savedVideoController from './savedVideoController.js';

const searchModalController = {
  initEventListeners() {
    controllerUtil.setObserver($searchContentIntersector, onAdditionalVideosLoad);
    $searchContentVideoWrapper.addEventListener('click', onSearchedVideoSave);
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
  initSearchQueries() {
    searchModalView.renderSearchQueries(searchQueryModel.getItem());
  },
  initSearchedVideos() {
    const prevSearchedVideos = prevSearchResultModel.getItem().prevSearchedVideos;
    if (prevSearchedVideos.length === 0) {
      return;
    }
    searchedVideoModel.setVideos(prevSearchedVideos);
    searchModalController.renderModalContents();
  },
  renderModalContents() {
    const videos = searchedVideoModel.getVideos();
    const isSavedMarkedVideos = savedVideoService.getIsSavedMarkedVideos(videos);
    searchModalView.renderSearchedVideos(isSavedMarkedVideos);
    searchModalView.showSearchContentIntersector();
    searchModalView.renderSearchQueries(searchQueryModel.getItem());
    searchModalView.renderSavedVideoCount(savedVideoModel.getItem().length);
  },
};

function onModalOpen() {
  searchModalView.openModal();
  if (searchedVideoService.isSearchedVideosEmpty()) {
    searchModalController.initSearchedVideos();
    return;
  }
  searchModalController.renderModalContents();
}

function onModalClose() {
  searchModalView.closeModal();
}

function onVideoSearch(event) {
  event.preventDefault();
  const inputQuery = $searchFormInput.value.trim();
  if (inputQuery === prevSearchResultModel.getItem().lastQuery || inputQuery === '') {
    return;
  }
  searchVideo(inputQuery);
}

async function searchVideo(inputQuery) {
  searchModalView.showSearchPrepartion();
  const { videos, nextPageToken } = await getVideosByKeyword(inputQuery);
  if (videos.length === 0) {
    renderEmptySearchResult();
    return;
  }
  saveSearchInfo({ inputQuery, nextPageToken, videos });
  searchModalView.hideSkeletons();
  searchedVideoService.setSearchedVideos(videos);
  searchModalController.renderModalContents();
}

function onAdditionalVideosLoad() {
  const { lastQuery, nextPageToken } = prevSearchResultModel.getItem();
  loadAdditionalVideos(lastQuery, nextPageToken);
}

function onSearchedVideoSave({ target }) {
  if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }
  if (!savedVideoService.isSavedVideoCountUnderLimit()) {
    layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }
  saveSearchedVideo(target.dataset.videoId);
}

function renderEmptySearchResult() {
  searchModalView.hideSearchContentIntersector();
  searchModalView.showNotFountImage();
}

function saveSearchInfo({ inputQuery, nextPageToken, videos }) {
  prevSearchInfoService.saveSearchQuery(inputQuery);
  prevSearchInfoService.savePrevSearchInfo({ lastQuery: inputQuery, nextPageToken });
  prevSearchInfoService.savePrevSearchedVideos(videos);
}

async function loadAdditionalVideos(lastQuery, pageToken) {
  const { videos, nextPageToken } = await getVideosByKeyword(lastQuery, pageToken);
  prevSearchInfoService.savePrevSearchInfo({ nextPageToken });
  searchedVideoService.addSearchedVideos(videos);
  searchModalController.renderModalContents();
}

function saveSearchedVideo(videoId) {
  const searchedVideos = [...searchedVideoModel.getVideos()];
  const targetSearchedVideo = searchedVideos.find(video => video.videoId === videoId);
  if (!targetSearchedVideo) {
    return;
  }
  // if (savedVideoService.isSavedVideosEmpty()) {
  //   savedVideoView.hideEmptyVideoImage();
  // }
  savedVideoService.pushNewVideo(targetSearchedVideo);
  savedVideoController.renderFilteredVideos();
  searchModalController.renderModalContents();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_SAVE_SUCCESS, true);
}

export default searchModalController;
