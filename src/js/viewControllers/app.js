import $ from '../utils/DOM.js';
import {
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
} from '../templates/videoList.js';

const $searchModal = $('#video-search-modal');
const $videoList = $('#video-list');

function openModal() {
  $searchModal.classList.add('open');
}

function closeModal() {
  $searchModal.classList.remove('open');
}

function renderSavedVideoList(videoInfos, isWatchedMode) {
  const filteredVideoInfos = [...videoInfos].filter(
    videoInfo => isWatchedMode === videoInfo.isWatched
  );

  $videoList.innerHTML = filteredVideoInfos.length
    ? createSavedVideoListTemplate(filteredVideoInfos)
    : emptyVideoListTemplate;
}

function showSnackBar(contents) {
  const $snackbar = $('#snack-bar');

  $snackbar.innerText = contents;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
}

export { openModal, closeModal, renderSavedVideoList, showSnackBar };
