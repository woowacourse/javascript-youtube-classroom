import $ from '../utils/DOM.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import keywordListTemplate from '../templates/keywordList.js';
import { videoListTemplate } from '../templates/videoList.js';
import videoSkeletonTemplate from '../templates/videoSkeleton.js';
import notFoundTemplate from '../templates/notFound.js';

const $savedVideoCount = $('#saved-video-count');
const $latestKeywordList = $('#latest-keyword-list');
const $videoSearchResult = $('#video-search-result');
const $videoSearchForm = $('#video-search-form');

function renderSavedVideoCount(count) {
  $savedVideoCount.innerText = `${count} / ${MAX_SAVED_VIDEO_COUNT}`;
}

function renderLatestKeywordList(latestKeywords) {
  $latestKeywordList.innerHTML = keywordListTemplate(latestKeywords);
}

function renderVideoLoader() {
  $videoSearchResult.innerHTML = videoSkeletonTemplate();
}

function renderVideoSearchResult(resultItems, videoInfos) {
  $videoSearchResult.innerHTML = resultItems.length
    ? videoListTemplate(resultItems, videoInfos)
    : notFoundTemplate;
}

function appendVideos(searchResult, videoInfos) {
  $videoSearchResult.innerHTML += videoListTemplate(searchResult, videoInfos);
}

function search(keyword) {
  $videoSearchForm.elements['video-search-input'].value = keyword;
  $videoSearchForm.elements['video-search-submit'].click();
}

function toggleSaveButton($saveButton) {
  if ($saveButton.classList.contains('js-save-button')) {
    $saveButton.innerText = '↪️ 저장 취소';
    $saveButton.classList.remove('js-save-button');
    $saveButton.classList.add('js-save-cancel-button');
  } else {
    $saveButton.innerText = '⬇️ 저장';
    $saveButton.classList.remove('js-save-cancel-button');
    $saveButton.classList.add('js-save-button');
  }
}

function updateModalSaveButton(videoId) {
  const $targetSaveButton = $(
    `[data-video-id=${videoId}] .js-save-cancel-button`
  );

  toggleSaveButton($targetSaveButton);
}

export {
  renderSavedVideoCount,
  renderLatestKeywordList,
  renderVideoLoader,
  renderVideoSearchResult,
  appendVideos,
  search,
  toggleSaveButton,
  updateModalSaveButton,
};
