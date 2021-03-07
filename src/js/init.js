import $ from './library/utils/DOM.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import createIntersectionObserver from './library/intersectionObserver.js';
import state from './library/state.js';
import { openModal, closeModal } from './viewControllers/app.js';
import handleLatestKeywordSearch from './handlers/latestKeywordSearch.js';

function initState() {
  // TODO: localStorage에서 가져온 videoInfos 업데이트(ex. 제목, 채널명 ..)
  const videoInfos = JSON.parse(localStorage.getItem('videoInfos')) ?? [];
  const latestKeywords =
    JSON.parse(localStorage.getItem('latestKeywords')) ?? [];
  const intersectionObserver = createIntersectionObserver();

  state.setVideoInfos(videoInfos);
  state.setLatestKeywords(latestKeywords);
  state.setIntersectionObserver(intersectionObserver);
}

function initEvent() {
  $('#search-button').addEventListener('click', openModal);
  $('#modal-close-button').addEventListener('click', closeModal);
  $('#video-search-form').addEventListener('submit', handleVideoSearch);
  $('#video-search-result').addEventListener('click', handleVideoSave);
  $('#latest-keyword-list').addEventListener(
    'click',
    handleLatestKeywordSearch
  );
}

export { initState, initEvent };
