import $ from '../utils/DOM.js';
import {
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
} from '../templates/videoList.js';

const $searchModal = $('#video-search-modal');
const $videoList = $('#video-list');

function openModal() {
  $searchModal.classList.add('open');
  document.body.classList.add('disable-scroll');
}

function closeModal() {
  $searchModal.classList.remove('open');
  document.body.classList.remove('disable-scroll');
}

function renderSavedVideoList(videoInfos, videoListType) {
  const filteredVideoInfos = [...videoInfos].filter(
    videoInfo => videoListType === videoInfo.watchType
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

function toggleFocusedModeButton() {
  $('#watched-video-display-button').classList.toggle('bg-cyan-100');
  $('#to-watch-video-display-button').classList.toggle('bg-cyan-100');
}

export {
  openModal,
  closeModal,
  renderSavedVideoList,
  showSnackBar,
  toggleFocusedModeButton,
};
