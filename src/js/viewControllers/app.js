import { $, $$ } from '../utils/DOM.js';
import {
  savedVideoListTemplate,
  emptyVideoListTemplate,
} from '../templates/videoList.js';
import {
  LIKED_TYPE,
  TO_WATCH_TYPE,
  WATCHED_TYPE,
} from '../constants/filterType.js';
import {
  getLikedVideoInfos,
  getToWatchVideoInfos,
  getWatchedVideoInfos,
} from '../service.js';
import videoListType from '../states/videoListType.js';

const $searchModal = $('#video-search-modal');
const $videoList = $('#video-list');
const $videoSearchInput = $('#video-search-input');
const $snackbar = $('#snack-bar');

function openModal() {
  $searchModal.classList.add('open');
  $videoSearchInput.focus();
}

function closeModal() {
  $searchModal.classList.remove('open');
}

const getFilteredVideoList = {
  [TO_WATCH_TYPE]: () => getToWatchVideoInfos(),
  [WATCHED_TYPE]: () => getWatchedVideoInfos(),
  [LIKED_TYPE]: () => getLikedVideoInfos(),
};

function renderSavedVideoList() {
  const filteredVideoList = getFilteredVideoList[videoListType.get()]();

  $videoList.innerHTML = filteredVideoList.length
    ? savedVideoListTemplate(filteredVideoList)
    : emptyVideoListTemplate;
}

function showSnackBar(contents) {
  $snackbar.innerText = contents;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
}

const modeButtonSelector = {
  [TO_WATCH_TYPE]: '#to-watch-video-display-button',
  [WATCHED_TYPE]: '#watched-video-display-button',
  [LIKED_TYPE]: '#liked-video-display-button',
};

function changeFocusedModeButton(type) {
  $$('#mode-wrapper .js-mode-button').forEach($modeButton =>
    $modeButton.classList.remove('bg-cyan-100')
  );
  $(modeButtonSelector[type]).classList.add('bg-cyan-100');
}

export {
  openModal,
  closeModal,
  renderSavedVideoList,
  showSnackBar,
  changeFocusedModeButton,
};
