import { $ } from './util/dom.js';
import YoutubeMachine from './domain/YoutubeMachine.js';
import {
  renderSkeletonUI,
  resetVideoList,
  renderSearchResult,
  renderNextSearchResult,
} from './UI/renderVideoItems.js';
import '../css/index.css';
import '../assets/images/not_found.png';
import store from './store/store.js';
import { ERROR, THROTTLE_DELAY } from '../constants/constants.js';

export default function App() {
  const youtubeMachine = new YoutubeMachine();
  const validateInput = input => {
    if (input === '') {
      throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
    }
  };

  const handleSearch = () => {
    try {
      youtubeMachine.resetData();
      resetVideoList();
      const searchInput = $('#search-input-keyword').value.trim();
      validateInput(searchInput);
      youtubeMachine.searchTarget = searchInput;
      renderSkeletonUI();
      const response = youtubeMachine.callSearchAPI();
      youtubeMachine.updateData(response);
      renderSearchResult(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const isEndOfScroll = $element =>
    $element.scrollHeight - $element.scrollTop === $element.clientHeight;

  const handleScroll = e => {
    let throttle;
    if (isEndOfScroll(e.target) && !throttle) {
      renderSkeletonUI();
      const response = youtubeMachine.callSearchAPI();
      youtubeMachine.updateData(response);
      renderNextSearchResult(response);
      throttle = setTimeout(() => {
        throttle = null;
      }, THROTTLE_DELAY);
    }
  };

  const saveVideo = videoId => {
    const video = {
      id: videoId,
    };
    const savedStore = store.getLocalStorage();

    if (savedStore) {
      store.updateLocalStorage(video);
      return;
    }
    store.setLocalStorage([video]);
  };

  const handleSaveButtonClick = e => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    e.target.closest('button').hidden = true;
    const { videoId } = e.target.parentElement.dataset;
    saveVideo(videoId);
  };

  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch();
  });

  $('.video-list').addEventListener('scroll', handleScroll);

  $('.video-list').addEventListener('click', handleSaveButtonClick);
}

App();
