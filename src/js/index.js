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
  const handleSearch = () => {
    try {
      youtubeMachine.resetData();
      userInterface.resetVideoList();
      const searchInput = $('#search-input-keyword').value.trim();
      youtubeMachine.searchTarget = searchInput;
      userInterface.renderSkeletonUI();
      const response = youtubeMachine.callSearchAPI();
      youtubeMachine.updateData(response);
      userInterface.renderSearchResult(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleScroll = e => {
    if (isEndOfScroll(e.target) && !throttle) {
      userInterface.renderSkeletonUI();
      const response = youtubeMachine.callSearchAPI();
      youtubeMachine.updateData(response);
      userInterface.renderNextSearchResult(response);
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

  // 이벤트 등록
  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.remove('hide');
  });

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch();
  });

  $('.search-result').addEventListener('scroll', handleScroll);

  $('.search-result').addEventListener('click', handleSaveButtonClick);
}

App();
