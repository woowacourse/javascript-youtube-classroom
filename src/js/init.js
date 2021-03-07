import $ from './library/utils/DOM.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import { openModal, closeModal } from './viewControllers/app.js';
import handleLatestKeywordSearch from './handlers/latestKeywordSearch.js';
import videoInfos from './library/states/videoInfos.js';
import latestKeywords from './library/states/latestKeywords.js';
import intersectionObserver from './library/states/intersectionObserver.js';

function initState() {
  videoInfos.init();
  latestKeywords.init();
  intersectionObserver.init();
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
