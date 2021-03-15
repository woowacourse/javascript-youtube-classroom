import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $modal,
  $searchResultVideoWrapper,
} from '../elements.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import controllerUtil from './controllerUtil.js';
import {
  prevSearchResultModel,
  searchQueryModel,
  watchedVideoModel,
  watchingVideoModel,
} from '../store.js';
import modalService from '../service/modalService.js';
import { layoutView, modalView, watchedVideoView, watchingVideoView } from '../view/index.js';
import { BROWSER_HASH, SELECTOR_CLASS, SELECTOR_ID, SNACKBAR_MESSAGE } from '../constants.js';
import watchingVideoService from '../service/watchingVideoService.js';
import hashController from './hashController.js';

const modalController = {
  initEventListeners() {
    controllerUtil.setObserver(
      $searchResultIntersector,
      onAdditionalVideosLoad
    );
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
    $searchResultVideoWrapper.addEventListener('click', onSelectedVideoSave);
    $modal.addEventListener('click', (event) => {
      if (event.target.id === SELECTOR_ID.MODAL) {
        onModalClose();
      }
    });
  },

  initSearchQueries() {
    modalView.renderSearchQueries(searchQueryModel.getItem());
  },

};

function onSelectedVideoSave({ target }) {
  if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }

  if (!watchingVideoService.isVideoCountUnderLimit()) {
    layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }

  if (watchingVideoService.isVideosEmpty()) {
    watchingVideoView.hideEmptyVideoImage();
    watchedVideoView.hideEmptyVideoImage();
  }
  watchingVideoService.pushNewVideo(target.dataset);

  if (controllerUtil.parseHash(location.hash) === BROWSER_HASH.WATCHING) {
    watchingVideoView.renderVideos(watchingVideoModel.getItem());
  }
  modalView.hideVideoSaveButton(target);
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
}

function onModalOpen() {
  layoutView.highlightNavButton(BROWSER_HASH.SEARCH);
  const allVideoCount =
    watchingVideoModel.getItem().length + watchedVideoModel.getItem().length;
  const videos = prevSearchResultModel.getItem().prevSearchedVideos;
  const processedVideos = modalService.getProcessedVideos(videos);

  modalView.openModal();
  modalView.renderSavedVideoCount(allVideoCount);
  if (videos.length === 0) {
    return;
  }
  modalView.renderSearchedVideos(processedVideos);
  modalView.showSearchResultIntersector();
  modalView.focusElement($searchFormInput);
}

function onModalClose() {
  hashController.routeByHash();
  modalView.closeModal();
}

async function onVideoSearch(event) {
  event.preventDefault();
  const input = $searchFormInput.value.trim();

  if (input === prevSearchResultModel.getItem().lastQuery) {
    return;
  }
  if (input === '') {
    return;
  }

  modalView.initSearchEnv();
  const { videos, nextPageToken } = await getVideosByKeyword(input);

  if (videos.length === 0) {
    modalView.showNotFountImage();
    return;
  }

  modalService.saveSearchQuery(input);
  modalService.savePrevSearchInfo({ lastQuery: input, nextPageToken });
  modalService.savePrevSearchedVideos(videos);
  modalView.hideSkeletons();
  modalView.renderSearchQueries(searchQueryModel.getItem());
  modalView.renderSearchedVideos(modalService.getProcessedVideos(videos));
}

async function onAdditionalVideosLoad() {
  const { lastQuery, pageToken } = modalService.getPrevSearchInfo();
  const { videos, nextPageToken } = await getVideosByKeyword(
    lastQuery,
    pageToken
  );
  modalView.insertSearchedVideos(videos);
  modalService.savePrevSearchInfo({ nextPageToken });
}

export default modalController;
