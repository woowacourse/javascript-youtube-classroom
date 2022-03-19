import '../css/index.css';
import '../assets/images/not_found.png';
import { $ } from './util/dom.js';
import { ELEMENTS, MESSAGE, VIDEO } from './constants/constants.js';
import { throttle } from './util/general.js';
import searchResultView from './views/searchResultView.js';
import { handleSearch, handleVideoListScroll } from './handlers/searchModal.js';
import {
  initSavedVideos,
  handleSaveVideo,
  handleDeleteVideo,
  handleWatchedVideo,
  handleWatchedContent,
} from './handlers/manageVideo.js';

export default function App() {
  initSavedVideos();

  $('#watched-video').addEventListener('click', handleWatchedContent);

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

  ELEMENTS.VIDEO_LIST.addEventListener(
    'scroll',
    throttle(handleVideoListScroll, VIDEO.THROTTLE_DELAY)
  );

  ELEMENTS.VIDEO_LIST.addEventListener('click', handleSaveVideo);

  $('#search-modal-button').addEventListener('click', searchResultView.toggleModal);

  $('.dimmer').addEventListener('click', searchResultView.toggleModal);

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}

App();
