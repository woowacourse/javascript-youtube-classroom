import { $, isEndOfScroll } from './util/general.js';
import YoutubeMachine from './domain/YoutubeMachine.js';
import userInterface from './ui/userInterface.js';
import '../css/index.css';
import '../assets/images/not_found.png';
import storage from './storage/storage.js';
import { THROTTLE_DELAY } from './constants/constants.js';

export default function App() {
  const youtubeMachine = new YoutubeMachine();
  let throttle;

  // 핸들러
  const handleSearch = async () => {
    try {
      const searchInput = $('#search-input-keyword').value.trim();
      youtubeMachine.searchTarget = searchInput;
      userInterface.resetVideoList();
      userInterface.renderSkeletonUI();
      addVideoListEvents();
      const response = await youtubeMachine.callSearchAPI();
      userInterface.renderSearchResult(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleScroll = async e => {
    if (isEndOfScroll(e.target) && !throttle) {
      userInterface.renderSkeletonUI();
      const response = await youtubeMachine.callSearchAPI();
      userInterface.renderSearchResult(response);
      if (!response.nextPageToken) {
        $('.video-list').removeEventListener('scroll', handleScroll);
      }
      throttle = setTimeout(() => {
        throttle = null;
      }, THROTTLE_DELAY);
    }
  };

  const handleSaveButtonClick = e => {
    const isSaveButtonClick = e.target.classList.contains('video-item__save-button');
    if (isSaveButtonClick) {
      e.target.closest('button').hidden = true;
      const selectedVideoId = e.target.closest('li').dataset.videoId;
      storage.saveVideo(selectedVideoId);
    }
  };

  const addVideoListEvents = () => {
    $('.video-list').addEventListener('scroll', handleScroll);

    $('.video-list').addEventListener('click', handleSaveButtonClick);
  };

  const toggleModal = () => {
    $('.modal-container').classList.toggle('hide');
  };

  // 이벤트 등록
  $('#search-modal-button').addEventListener('click', toggleModal);

  $('.dimmer').addEventListener('click', toggleModal);

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch();
  });
}

App();
