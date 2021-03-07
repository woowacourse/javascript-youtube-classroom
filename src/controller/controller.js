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
import {
  setLocalStorageItem,
  getLocalStorageItem,
  pushLocalStorageItem,
} from '../storage/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  SETTINGS,
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
    $searchResultVideoWrapper.addEventListener('click', onSelectedVideoSave);
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
  initSearchQueries() {
    const searchQueries = getLocalStorageItem(LOCAL_STORAGE_KEY.SEARCH_QUERIES);
    searchQueries.reverse();
    view.renderSearchQueries(searchQueries);
  },
  initVideos() {
    const videos = getLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH);
    view.renderSelectedVideoItems($videoWrapper, videos);
  },
};

function onAdditionalVideosLoad() {
  getVideosByKeyword(model.getLastQuery(), model.getNextPageToken()).then(
    ({ videos, nextPageToken }) => {
      view.insertVideoItems($searchResultVideoWrapper, videos);
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
  if (!prevSearchResult?.videos) {
    return;
  }
  const processedVideos = prevSearchResult.videos.map(video => ({
    ...video,
    isSaved: isVideoToWatch(video.videoId),
  }));
  view.insertVideoItems($searchResultVideoWrapper, processedVideos);
  view.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
  model.setNextPageToken(prevSearchResult.nextPageToken);
  model.setLastQuery(prevSearchResult.lastQuery);
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
    if (!getLocalStorageItem(LOCAL_STORAGE_KEY.SEARCH_QUERIES)) {
      return;
    }

    const queries = getLocalStorageItem(
      LOCAL_STORAGE_KEY.SEARCH_QUERIES
    ).filter(query => input !== query);
    setLocalStorageItem(LOCAL_STORAGE_KEY.SEARCH_QUERIES, queries);
    pushLocalStorageItem(LOCAL_STORAGE_KEY.SEARCH_QUERIES, input);
    const reversedQueries = getLocalStorageItem(
      LOCAL_STORAGE_KEY.SEARCH_QUERIES
    ).reverse();
    view.renderSearchQueries(reversedQueries);
    const processedVideos = videos.map(video => ({
      ...video,
      isSaved: isVideoToWatch(video.videoId),
    }));
    view.insertVideoItems($searchResultVideoWrapper, processedVideos);
    view.showElementBySelector(`#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`);
    setLocalStorageItem(LOCAL_STORAGE_KEY.PREVIOUS_SEARCH_RESULTS, {
      lastQuery: model.getLastQuery(),
      videos,
      nextPageToken,
    });
  });
}

function onSelectedVideoSave({ target }) {
  if (
    !target.classList.contains(SELECTOR_CLASS.CLIP_SAVE_BUTTON) ||
    getLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH).length >
      SETTINGS.MAX_SAVE_COUNT
  ) {
    return;
  }

  const videosToWatch = getLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH);
  const newVideo = {
    title: target.dataset.title,
    channelTitle: target.dataset.channelTitle,
    publishedAt: target.dataset.publishedAt,
    videoId: target.dataset.videoId,
    isSaved: true,
  };
  view.hideElement(target);
  videosToWatch.push(newVideo);
  setLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH, videosToWatch);
  view.renderSelectedVideoItems($videoWrapper, videosToWatch);
}

function isVideoToWatch(videoId) {
  return getLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH).some(
    video => video.videoId === videoId
  );
}

export default controller;
