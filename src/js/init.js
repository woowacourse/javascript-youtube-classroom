import $ from './utils/DOM.js';
import handleVideoSearch from './handlers/videoSearch.js';
import handleVideoSave from './handlers/videoSave.js';
import {
  openModal,
  closeModal,
  renderSavedVideoList,
} from './viewControllers/app.js';
import videoInfos from './states/videoInfos.js';
import latestKeywords from './states/latestKeywords.js';
import intersectionObserver from './states/intersectionObserver.js';
import {
  renderLatestKeywordList,
  renderSavedVideoCount,
} from './viewControllers/searchModal.js';

async function initState() {
  await videoInfos.init();
  latestKeywords.init();
  intersectionObserver.init();
}

async function initView() {
  await initState();

  renderSavedVideoList(videoInfos.get());
  renderSavedVideoCount(videoInfos.size);
  renderLatestKeywordList(latestKeywords.get());
}

function initEvent() {
  $('#search-button').addEventListener('click', openModal);
  $('#modal-close-button').addEventListener('click', closeModal);
  $('#video-search-form').addEventListener('submit', handleVideoSearch);
  $('#latest-keyword-list').addEventListener('click', handleVideoSearch);
  $('#video-search-result').addEventListener('click', handleVideoSave);
}

export { initState, initView, initEvent };
