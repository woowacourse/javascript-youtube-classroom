import { $ } from '../utils/DOM.js';
import {
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
} from '../templates/videoList.js';

const $searchModal = $('#video-search-modal');
const $videoList = $('#video-list');

export function openModal() {
  $searchModal.classList.add('open');
}

export function closeModal() {
  $searchModal.classList.remove('open');
}

export function renderSavedVideoList(videoInfos, videoListType) {
  const oldVideoInfos = [...videoInfos];
  const filteredVideoInfos = oldVideoInfos.filter(
    videoInfo => videoListType === videoInfo.watchType
  );

  $videoList.innerHTML = filteredVideoInfos.length
    ? createSavedVideoListTemplate(filteredVideoInfos)
    : emptyVideoListTemplate;
}

function snackBar() {
  const $snackbar = $('#snack-bar');
  let timerId = null;

  function show(contents) {
    if (timerId) {
      clearTimeout(timerId);
    }

    $snackbar.innerText = contents;
    $snackbar.classList.toggle('show');
    timerId = setTimeout(() => {
      $snackbar.classList.toggle('show');
    }, 3000);
  }

  return show;
}

export const showSnackBar = snackBar();

export function toggleFocusedModeButton() {
  $('#watched-video-display-button').classList.toggle('bg-cyan-100');
  $('#to-watch-video-display-button').classList.toggle('bg-cyan-100');
}
