import '../css/index.css';
import '../assets/images/not_found.png';
import '../assets/images/empty_storage.jpeg';
import { $ } from './util/dom.js';
import { MESSAGE, THROTTLE_DELAY } from './constants/constants.js';
import { isEndOfScroll, throttle } from './util/general.js';
import storage from './storage/storage.js';
import YoutubeSearch from './domain/YoutubeSearch.js';
import searchResultView from './ui/searchResultView.js';

export default function App() {
  const youtubeSearch = new YoutubeSearch();

  const initSavedVideo = () => {
    const savedVideos = storage.getLocalStorage();
    if (savedVideos) {
      $('.empty-video-image').classList.add('hide');
      searchResultView.renderSavedVideos(savedVideos);
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
    if (!isSaveButtonClick) {
      return;
    }
    e.target.hidden = true;
    const selectedVideo = e.target.closest('li');
    const videoData = [
      {
        videoId: selectedVideo.dataset.videoId,
        thumbnails: selectedVideo.querySelector('.video-item__thumbnail').src,
        title: selectedVideo.querySelector('.video-item__title').textContent,
        channelTitle: selectedVideo.querySelector('.video-item__channel-name').textContent,
        publishTime: selectedVideo.querySelector('.video-item__published-date').textContent,
      },
    ];
    storage.saveVideo(videoData);
    $('.empty-video-image').classList.add('hide');
    searchResultView.renderSavedVideos(videoData);
  };

  const handleDeleteVideo = (selectedVideoId) => {
    const deletedData = storage
      .getLocalStorage()
      .filter((video) => video.videoId !== selectedVideoId);
    storage.setLocalStorage(deletedData);
    $('.saved-video-list').replaceChildren();
    if (deletedData.length !== 0) {
      searchResultView.renderSavedVideos(deletedData);
      return;
    }
    storage.resetLocalStorage();
    $('.empty-video-image').classList.remove('hide');
  };

  // 이벤트 등록
  const addVideoListEvents = () => {
    $('.video-list').addEventListener('scroll', throttle(handleVideoListScroll, THROTTLE_DELAY));

    $('.video-list').addEventListener('click', handleSaveVideos);
  };

  $('.saved-video-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('video-remove-button')) {
      if (window.confirm(MESSAGE.CONFIRM.CHECK_DELETE)) {
        const selectedVideoId = e.target.closest('li').dataset.videoId;
        handleDeleteVideo(selectedVideoId);
      }
    }
    // if (e.target.classList.contains('video-watched-button')) {

    // }
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
