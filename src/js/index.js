import '../css/index.css';
import '../assets/images/not_found.png';
import { $ } from './util/dom.js';
import { THROTTLE_DELAY } from './constants/constants.js';
import { isEndOfScroll, throttle } from './util/general.js';
import storage from './storage/storage.js';
import YoutubeSearch from './domain/YoutubeSearch.js';
import searchResultView from './ui/searchResultView.js';

export default function App() {
  const youtubeSearch = new YoutubeSearch();

  const initSavedVideo = () => {
    if (storage.getLocalStorage()) {
      console.log('store');
    }
  };

  const renderHandler = async () => {
    searchResultView.renderSkeletonUI();
    const response = await youtubeSearch.fetchYoutubeAPI();
    searchResultView.renderSearchResult(response);
    const isLastVideos = response.items.length !== 0 && !response.nextPageToken;
    if (isLastVideos) {
      $('.video-list').removeEventListener(
        'scroll',
        throttle(handleVideoListScroll, THROTTLE_DELAY)
      );
    }
  };

  // 핸들러
  const handleSearch = () => {
    try {
      const searchInput = $('#search-input-keyword').value.trim();
      youtubeSearch.searchTarget = searchInput;
      youtubeSearch.pageToken = '';
      searchResultView.resetVideoList();
      addVideoListEvents();
      renderHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVideoListScroll = () => {
    if (isEndOfScroll($('.video-list'))) {
      renderHandler();
    }
  };

  const handleSaveVideos = (e) => {
    const isSaveButtonClick = e.target.classList.contains('video-item__save-button');
    if (isSaveButtonClick) {
      e.target.hidden = true;
      const selectedVideoId = e.target.closest('li').dataset.videoId;
      storage.saveVideo(selectedVideoId);
    }
  };

  // 이벤트 등록
  const addVideoListEvents = () => {
    $('.video-list').addEventListener('scroll', throttle(handleVideoListScroll, THROTTLE_DELAY));

    $('.video-list').addEventListener('click', handleSaveVideos);
  };

  $('#search-modal-button').addEventListener('click', searchResultView.toggleModal);

  $('.dimmer').addEventListener('click', searchResultView.toggleModal);

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  initSavedVideo();
}

App();
