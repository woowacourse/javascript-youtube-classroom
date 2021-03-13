import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $searchResultVideoWrapper,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import prevSearchResult from '../storage/prevSearchResult.js';
import searchQuery from '../storage/searchQuery.js';
import videoToWatch from '../storage/videoToWatch.js';
import { SETTINGS, SELECTOR_CLASS, ALERT_MESSAGE } from '../constants.js';
import controllerUtil from './controllerUtil.js';

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
  if (!target.classList.contains(SELECTOR_CLASS.CLIP_SAVE_BUTTON)) {
    return;
  }

  if (videoToWatch.getVideos().length === SETTINGS.MAX_SAVE_COUNT) {
    view.showMessage(ALERT_MESSAGE.SAVE_LIMIT_EXCEEDED);
    return;
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
  },

  initSearchQueries() {
    view.renderSearchQueries(searchQuery.getQueries());
  },

  initVideos() {
    view.renderSelectedVideoItems(videoToWatch.getVideos());
  },

};

export default controller;
