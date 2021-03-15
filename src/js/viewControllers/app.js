import { $, $$, parseHTML } from '../utils/DOM.js';
import {
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
} from '../templates/videoList.js';
import videoInfos from '../states/videoInfos.js';

const $searchModal = $('#video-search-modal');
const $videoList = $('#video-list');
const $body = $('body');
const $snackbar = $('#snack-bar');

function closeModal() {
  $searchModal.classList.remove('open');
  $body.classList.remove('disable-scroll');
}
function openModal() {
  $searchModal.classList.add('open');
  $body.classList.add('disable-scroll');

  window.addEventListener('mouseup', e => {
    if (!e.target.closest('.modal-inner')) {
      closeModal();
    }
  });
}

function renderSavedVideoList(videoInfos, videoListType) {
  let filteredVideoInfos = [];
  if (videoListType === 'liked') {
    filteredVideoInfos = [...videoInfos].filter(
      videoInfo => videoListType === videoInfo.likeType
    );
  } else {
    filteredVideoInfos = [...videoInfos].filter(
      videoInfo => videoListType === videoInfo.watchType
    );
  }

  $videoList.innerHTML = filteredVideoInfos.length
    ? createSavedVideoListTemplate(filteredVideoInfos)
    : emptyVideoListTemplate;
}

function appendSavedVideo(videoInfo) {
  $videoList.append(
    parseHTML(
      createSavedVideoListTemplate([{ ...videoInfo, watchType: 'toWatch' }])
    )
  );
}

function removeSavedVideo($targetVideo) {
  $targetVideo.remove();
}

function updateSavedVideo($targetVideo) {
  const targetVideo = videoInfos
    .get()
    .find(videoInfo => videoInfo.id.videoId === $targetVideo.dataset.videoId);
  const updateTargetVideo = parseHTML(
    createSavedVideoListTemplate([targetVideo])
  );

  $videoList.replaceChild(updateTargetVideo, $targetVideo);
}

function showSnackBar(contents) {
  $snackbar.innerText = contents;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
}

function toggleFocusedModeButton(targetId) {
  $$('.js-mode-button').forEach($modeButton =>
    $modeButton.id === targetId
      ? $modeButton.classList.add('bg-cyan-100')
      : $modeButton.classList.remove('bg-cyan-100')
  );
}

export {
  openModal,
  closeModal,
  renderSavedVideoList,
  showSnackBar,
  toggleFocusedModeButton,
  appendSavedVideo,
  removeSavedVideo,
  updateSavedVideo,
};
