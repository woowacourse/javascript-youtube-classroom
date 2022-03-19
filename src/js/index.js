import '../css/index.css';
import '../assets/images/not_found.png';
import '../assets/images/empty_storage.jpeg';
import { $ } from './util/dom.js';
import storage from './storage/storage.js';
import searchResultView from './views/searchResultView.js';
import { handleSearch, handleVideoListScroll } from './handlers/searchModal.js';
import { handleSaveVideo, handleDeleteVideo, handleWatchedVideo } from './handlers/manageVideo.js';
import { renderSavedVideos } from './views/savedVideoList.js';
import { ELEMENTS, MESSAGE, VIDEO } from './constants/constants.js';
import { throttle } from './util/general.js';

export default function App() {
  const content = 'unseen';

  const initSavedVideo = () => {
    const savedVideos = storage.getLocalStorage();
    if (savedVideos) {
      ELEMENTS.EMPTY_VIDEO_IMAGE.classList.add('hide');
      renderSavedVideos(content, savedVideos);
    }
  };

  $('.search-result').addEventListener(
    'scroll',
    throttle(handleVideoListScroll, VIDEO.THROTTLE_DELAY)
  );

  $('.search-result').addEventListener('click', handleSaveVideo);

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

  $('#search-modal-button').addEventListener('click', searchResultView.toggleModal);

  $('.dimmer').addEventListener('click', searchResultView.toggleModal);

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  initSavedVideo();
}

App();
