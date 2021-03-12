import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
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
import { modalView } from '../view/index.js';

const modalController = {
  initEventListeners() {
    controllerUtil.setObserver(
      $searchResultIntersector,
      onAdditionalVideosLoad
    );
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
  initSearchQueries() {
    modalView.renderSearchQueries(searchQueryModel.getItem());
  },
};

function onModalOpen() {
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
}

function onModalClose() {
  modalView.closeModal();
}

async function onVideoSearch(event) {
  event.preventDefault();
  const input = $searchFormInput.value.trim();
  //TODO: validation 으로 빼기
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
