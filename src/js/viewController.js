// TODO: 컴포넌트 영역 별로 코드 분리

import { MAX_SAVED_VIDEO_COUNT } from './library/constants/classroom.js';
import dom from './library/DOMelements.js';
import createKeywordListTemplate from './library/templates/keywordList.js';
import createNotFoundTemplate from './library/templates/notFound.js';
import {
  createVideoListTemplate,
  createSavedVideoListTemplate,
} from './library/templates/videoList.js';
import createVideoSkeletonTemplate from './library/templates/videoSkeleton.js';

function openModal() {
  dom.$searchModal.classList.add('open');
}

function closeModal() {
  dom.$searchModal.classList.remove('open');
}

function renderSavedVideoCount(count) {
  dom.$savedVideoCount.innerText = `${count} / ${MAX_SAVED_VIDEO_COUNT}`;
}

function renderLatestKeywordList(latestKeywords) {
  dom.$latestKeywordList.innerHTML = createKeywordListTemplate(latestKeywords);
}

function renderVideoLoader() {
  dom.$videoSearchResult.innerHTML = createVideoSkeletonTemplate();
}

function renderVideoSearchResult(resultItems, videoInfos) {
  dom.$videoSearchResult.innerHTML = resultItems.length
    ? createVideoListTemplate(resultItems, videoInfos)
    : createNotFoundTemplate();
}

function renderSavedVideoList(videoInfos) {
  dom.$videoList.innerHTML = createSavedVideoListTemplate(videoInfos);
}

function appendVideos(searchResult, videoInfos) {
  dom.$videoSearchResult.innerHTML += createVideoListTemplate(
    searchResult,
    videoInfos
  );
}

export {
  openModal,
  closeModal,
  renderSavedVideoCount,
  renderLatestKeywordList,
  renderVideoLoader,
  renderVideoSearchResult,
  renderSavedVideoList,
  appendVideos,
};
