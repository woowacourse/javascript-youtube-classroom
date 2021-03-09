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

function renderSavedVideoList(videoInfos) {
  $videoList.innerHTML = videoInfos.size
    ? createSavedVideoListTemplate(videoInfos)
    : emptyVideoListTemplate;
}

export { openModal, closeModal, renderSavedVideoList };
