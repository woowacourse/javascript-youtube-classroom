import dom from './library/DOMelements.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import createIntersectionObserver from './library/intersectionObserver.js';
import state from './library/state.js';
import { openModal, closeModal } from './viewController.js';
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
  dom.$modalOpenButton.addEventListener('click', openModal);
  dom.$modalCloseButton.addEventListener('click', closeModal);
  dom.$videoSearchForm.addEventListener('submit', handleVideoSearch);
  dom.$videoSearchResult.addEventListener('click', handleVideoSave);
  dom.$latestKeywordList.addEventListener('click', handleLatestKeywordSearch);
}

export { initState, initEvent };
