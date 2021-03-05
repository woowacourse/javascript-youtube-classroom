import dom from './library/DOMelements.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import createIntersectionObserver from './library/intersectionObserver.js';
import state from './library/state.js';
import { openModal, closeModal } from './viewController.js';

function initState() {
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
}

export { initState, initEvent };
