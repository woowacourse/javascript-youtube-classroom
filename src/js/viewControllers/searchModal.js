import $ from '../library/utils/DOM.js';
import { MAX_SAVED_VIDEO_COUNT } from '../library/constants/classroom.js';
import createNotFoundTemplate from '../library/templates/notFound.js';
import createKeywordListTemplate from '../library/templates/keywordList.js';
import { createVideoListTemplate } from '../library/templates/videoList.js';
import createVideoSkeletonTemplate from '../library/templates/videoSkeleton.js';

const $savedVideoCount = $('#saved-video-count');
const $latestKeywordList = $('#latest-keyword-list');
const $videoSearchResult = $('#video-search-result');
const $videoSearchForm = $('#video-search-form');

function renderSavedVideoCount(count) {
  $savedVideoCount.innerText = `${count} / ${MAX_SAVED_VIDEO_COUNT}`;
}

function renderLatestKeywordList(latestKeywords) {
  $latestKeywordList.innerHTML = createKeywordListTemplate(latestKeywords);
}

function renderVideoLoader() {
  $videoSearchResult.innerHTML = createVideoSkeletonTemplate();
}

function renderVideoSearchResult(resultItems, videoInfos) {
  $videoSearchResult.innerHTML = resultItems.length
    ? createVideoListTemplate(resultItems, videoInfos)
    : createNotFoundTemplate();
}

function appendVideos(searchResult, videoInfos) {
  $videoSearchResult.innerHTML += createVideoListTemplate(
    searchResult,
    videoInfos
  );
}

function search(keyword) {
  $videoSearchForm.elements['video-search-input'].value = keyword;
  $videoSearchForm.elements['video-search-submit'].click();
}

export {
  renderSavedVideoCount,
  renderLatestKeywordList,
  renderVideoLoader,
  renderVideoSearchResult,
  appendVideos,
  search,
};
