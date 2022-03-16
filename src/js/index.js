import { $, quickModalElement } from './util/general.js';
import YoutubeMachine from './domain/YoutubeMachine.js';
import userInterface from './ui/userInterface.js';
import '../css/index.css';
import '../assets/images/not_found.png';
import storage from './storage/storage.js';
import { THROTTLE_DELAY } from './constants/constants.js';
import { applyThrottle } from './util/throttle.js';

export default function App() {
  const youtubeMachine = new YoutubeMachine();

  const handleSearch = () => {
    try {
      youtubeMachine.resetSearchResult();
      userInterface.resetVideoList();
      const searchInput = $('#search-input-keyword').value.trim();
      userInterface.renderSkeletonUI();
      youtubeMachine.search(searchInput);
      userInterface.renderSearchResult(youtubeMachine.searchResult);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      userInterface.renderSkeletonUI();
      youtubeMachine.searchScrollingResult();
      userInterface.renderNextSearchResult(youtubeMachine.searchResult);
    }
  };

  const handleSaveButtonClick = e => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    e.target.closest('button').hidden = true;
    const { videoId } = e.target.parentElement.dataset;
    storage.saveVideo(videoId);
  };

  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch();
  });

  $('.video-list').addEventListener('scroll', applyThrottle(handleScroll, THROTTLE_DELAY));

  $('.video-list').addEventListener('click', handleSaveButtonClick);

  $('.dimmer').addEventListener('click', quickModalElement);
}

App();
