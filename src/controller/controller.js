import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosAsync } from '../apis/youtube.js';
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from '../storage/localStorage.js';
import { LOCAL_STORAGE_KEY, SELECTOR_ID } from '../constants.js';

function onModalOpen() {
  view.openModal();
  const prevSearchResults = getLocalStorageItem(
    LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS
  );
  if (prevSearchResults) {
    view.renderVideoItems(prevSearchResults);
  }
}

function onModalClose() {
  view.closeModal();
}

function onVideoSearch(event) {
  event.preventDefault();
  view.renderSkeletonItems();
  getVideosAsync($searchFormInput.value).then(videos => {
    view.renderVideoItems(videos);
    if (videos.length === 0) {
      view.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
      return;
    }
    setLocalStorageItem(LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS, videos);
  });
}

const controller = {
  initEventListeners() {
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
};

export default controller;
