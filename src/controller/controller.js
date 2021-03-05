import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from '../storage/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  SELECTOR_ID,
  SELECTOR_CLASS,
} from '../constants.js';
import { model } from '../store.js';

const controller = {
  initEventListeners() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          onAdditionalVideosLoad();
        }
      });
    });
    observer.observe($searchResultIntersector);

    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
};

function onAdditionalVideosLoad() {
  getVideosByKeyword(model.getLastQuery(), model.getNextPageToken()).then(
    ({ videos, nextPageToken }) => {
      view.renderVideoItems(videos);
      if (videos.length === 0) {
        view.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
        return;
      }
      model.setNextPageToken(nextPageToken);
    }
  );
}

function onModalOpen() {
  view.openModal();
  const prevSearchResult = getLocalStorageItem(
    LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS
  );
  if (prevSearchResult) {
    view.renderVideoItems(prevSearchResult.videos);
    view.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
    model.setNextPageToken(prevSearchResult.nextPageToken);
    model.setLastQuery(prevSearchResult.lastQuery);
  }
}

function onModalClose() {
  view.closeModal();
}

function onVideoSearch(event) {
  event.preventDefault();
  const input = $searchFormInput.value;
  if (input === model.getLastQuery()) {
    return;
  }
  view.hideElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
  view.renderSkeletonItems();
  getVideosByKeyword(input).then(({ videos, nextPageToken }) => {
    model.setLastQuery(input);
    model.setNextPageToken(nextPageToken);
    view.hideElementBySelector(`.${SELECTOR_CLASS.SKELETON}`);
    if (videos.length === 0) {
      view.showElementBySelector(`#${SELECTOR_ID.NOT_FOUND_CONTENT}`);
      return;
    }
    view.renderVideoItems(videos);
    view.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
    setLocalStorageItem(LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS, {
      lastQuery: model.getLastQuery(),
      videos,
      nextPageToken,
    });
  });
}

export default controller;
