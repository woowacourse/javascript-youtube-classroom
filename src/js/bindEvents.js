import { $ } from './util/dom.js';
import { ELEMENTS, MESSAGE } from './constants/constants.js';
import { toggleModal } from './views/searchResultView.js';
import { handleSearch, handleVideoListScroll } from './handlers/searchModal.js';
import {
  handleSaveVideo,
  handleDeleteVideo,
  handleWatchedVideo,
  handleWatchedContent,
  handleUnseenContent,
} from './handlers/manageVideo.js';

export default function bindEvents() {
  ELEMENTS.UNSEEN_VIDEO_BUTTON.addEventListener('click', handleUnseenContent);

  ELEMENTS.WATCHED_VIDEO_BUTTON.addEventListener('click', handleWatchedContent);

  ELEMENTS.SAVED_VIDEO_LIST.addEventListener('click', (e) => {
    if (e.target.classList.contains('video-remove-button')) {
      if (window.confirm(MESSAGE.CONFIRM.CHECK_DELETE)) {
        const selectedVideoId = e.target.closest('li').dataset.videoId;
        handleDeleteVideo(selectedVideoId);
      }
    }
    if (e.target.classList.contains('video-watched-button')) {
      const selectedVideoId = e.target.closest('li').dataset.videoId;
      handleWatchedVideo(selectedVideoId);
    }
  });

  ELEMENTS.VIDEO_LIST.addEventListener('scroll', handleVideoListScroll);

  ELEMENTS.VIDEO_LIST.addEventListener('click', (e) => {
    const isSaveButtonClick = e.target.classList.contains('video-item__save-button');
    if (isSaveButtonClick) {
      handleSaveVideo(e.target);
    }
  });

  $('#search-modal-button').addEventListener('click', toggleModal);

  $('.dimmer').addEventListener('click', toggleModal);

  $('#search-button').addEventListener('click', handleSearch);

  ELEMENTS.SEARCH_INPUT_KEYWORD.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}
