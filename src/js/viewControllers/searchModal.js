import $ from '../utils/DOM.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import createKeywordListTemplate from '../templates/keywordList.js';
import { createVideoListTemplate } from '../templates/videoList.js';
import createVideoSkeletonTemplate from '../templates/videoSkeleton.js';
import notFoundTemplate from '../templates/notFound.js';

const $savedVideoCount = $('#saved-video-count');
const $latestKeywordList = $('#latest-keyword-list');
const $videoSearchResult = $('#video-search-result');

function renderSavedVideoCount(count) {
  $savedVideoCount.innerText = `${count} / ${MAX_SAVED_VIDEO_COUNT}`;
}

function renderLatestKeywordList(latestKeywords) {
  $latestKeywordList.innerHTML = createKeywordListTemplate(latestKeywords);
}

function renderVideoLoader() {
  $videoSearchResult.innerHTML = createVideoSkeletonTemplate();
}

function renderSearchVideoList(resultItems, videoInfos) {
  $videoSearchResult.innerHTML = resultItems.length
    ? createVideoListTemplate(resultItems, videoInfos)
    : notFoundTemplate;
}

function appendVideoList(searchResult, videoInfos) {
  $videoSearchResult.innerHTML += createVideoListTemplate(
    searchResult,
    videoInfos
  );
}

export {
  renderSavedVideoCount,
  renderLatestKeywordList,
  renderVideoLoader,
  renderSearchVideoList,
  appendVideoList,
};
