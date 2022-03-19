import '../css/index.css';
import '../assets/images/not_found.png';
import '../assets/images/empty_storage.jpeg';
import { $ } from './util/dom.js';
import storage from './storage/storage.js';
import searchResultView from './views/searchResultView.js';
import { handleSearch, handleVideoListScroll } from './handlers/searchModal.js';
import { handleDeleteVideo, handleWatchedVideo } from './handlers/manageSavedVideo.js';
import { handleSaveVideos } from './handlers/saveVideo.js';
import { MESSAGE, VIDEO } from './constants/constants.js';
import { throttle } from './util/general.js';

export default function App() {
  const content = 'unseen';

  const initSavedVideo = () => {
    const savedVideos = storage.getLocalStorage();
    if (savedVideos) {
      $('.empty-video-image').classList.add('hide');
      searchResultView.renderSavedVideos(content, savedVideos);
    }
  };

  $('.search-result').addEventListener(
    'scroll',
    throttle(handleVideoListScroll, VIDEO.THROTTLE_DELAY)
  );

  $('.search-result').addEventListener('click', handleSaveVideos);

  $('.saved-video-list').addEventListener('click', (e) => {
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
