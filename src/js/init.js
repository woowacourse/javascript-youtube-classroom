import $ from './utils/DOM.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import { openModal, closeModal } from './viewControllers/app.js';
import videoInfos from './states/videoInfos.js';
import latestKeywords from './states/latestKeywords.js';
import intersectionObserver from './states/intersectionObserver.js';

function initState() {
  videoInfos.init();
  latestKeywords.init();
  intersectionObserver.init();
}

function initEvent() {
  $('#search-button').addEventListener('click', openModal);
  $('#modal-close-button').addEventListener('click', closeModal);
  $('#video-search-form').addEventListener('submit', handleVideoSearch);
  $('#latest-keyword-list').addEventListener('click', handleVideoSearch);
  $('#video-search-result').addEventListener('click', handleVideoSave);
}

export { initState, initEvent };
