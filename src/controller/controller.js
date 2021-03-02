import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
} from '../elements.js';
import view from '../view/view.js';
import { getVideosAsync } from '../apis/youtube.js';

function onModalOpen() {
  view.openModal();
}

function onModalClose() {
  view.closeModal();
}

function onVideoSearch(event) {
  event.preventDefault();
  view.renderSkeletonItems();
  getVideosAsync($searchFormInput.value).then(videos => {
    view.renderVideoItems(videos);
  });
}

const controller = {
  initEventListeners() {
    $searchButton.addEventListener('click', onModalOpen);
    $modalCloseButton.addEventListener('click', onModalClose);
    $searchForm.addEventListener('submit', onVideoSearch);
  },
};

export default controller;
