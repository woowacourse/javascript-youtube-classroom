import $ from './utils/DOM.js';
import handleVideoSearch from './handlers/videoSearch.js';
import videoSaveManager from './handlers/videoSave.js';
import {
  openModal,
  closeModal,
  renderSavedVideoList,
} from './viewControllers/app.js';
import handleLatestKeywordSearch from './handlers/latestKeywordSearch.js';
import videoInfos from './states/videoInfos.js';
import latestKeywords from './states/latestKeywords.js';
import intersectionObserver from './states/intersectionObserver.js';
import handleButtonsControl from './handlers/buttonControl.js';
import handleModeChange from './handlers/modeChange.js';
import {
  renderLatestKeywordList,
  renderSavedVideoCount,
} from './viewControllers/searchModal.js';

async function initState() {
  await videoInfos.init();
  renderSavedVideoCount(videoInfos.size);
  renderSavedVideoList();
  latestKeywords.init();
  renderLatestKeywordList(latestKeywords.get());
  intersectionObserver.init();
}

function initEvent() {
  $('#search-button').addEventListener('click', openModal);
  $('#modal-close-button').addEventListener('click', closeModal);
  $('#video-search-form').addEventListener('submit', handleVideoSearch);
  $('#video-search-result').addEventListener('click', videoSaveManager);
  $('#latest-keyword-list').addEventListener(
    'click',
    handleLatestKeywordSearch
  );
  $('#video-list').addEventListener('click', handleButtonsControl);
  $('#mode-wrapper').addEventListener('click', handleModeChange);
  $('#video-search-modal').addEventListener('click', ({ target }) => {
    if (target.id === 'video-search-modal') closeModal();
  });
}

export { initState, initEvent };
