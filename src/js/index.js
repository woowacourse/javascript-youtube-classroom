import { $ } from './util/dom.js';
import YoutubeMachine from './domain/YoutubeMachine.js';
import {
  renderSkeletonUI,
  removeSkeletonUI,
  renderVideoItems,
  renderNoResult,
  resetVideoList,
} from './UI/renderVideoItems.js';
import '../css/index.css';
import '../assets/images/not_found.png';
import dummyData from '../../dummyData.js';
import store from './store/store.js';

export default function App() {
  const youtubeMachine = new YoutubeMachine();
  const validateInput = input => {
    if (input === '') {
      throw new Error('빈값을 입력할 수 없습니다. 다시 입력해 주세요.');
    }
  };

  const handleSearch = () => {
    try {
      resetVideoList();
      const searchInput = $('#search-input-keyword').value.trim();
      validateInput(searchInput);
      youtubeMachine.searchTarget = searchInput;
      renderSkeletonUI();
      const responseJSON = youtubeMachine.getSearchData();
      responseJSON
        .then(data => {
          // 비디오 렌더링
          youtubeMachine.data = data;
          removeSkeletonUI();
          renderVideoItems(data);
        })
        .catch(error => {
          // 검색결과없음
          removeSkeletonUI();
          renderNoResult();
        });
      // renderVideoItems(dummyData);
    } catch (error) {
      alert(error.message);
    }
  };

  let throttle;
  const isEndOfScroll = $element =>
    $element.scrollHeight - $element.scrollTop === $element.clientHeight;

  const handleScroll = e => {
    if (isEndOfScroll(e.target)) {
      if (!throttle) {
        renderSkeletonUI();
        const responseJSON = youtubeMachine.getNextSearchData(youtubeMachine.data);
        responseJSON.then(data => {
          // 비디오 렌더링
          youtubeMachine.data = data;
          removeSkeletonUI();
          renderVideoItems(data);
          console.log(data.items);
        });
        throttle = setTimeout(() => {
          throttle = null;
        }, 1000);
      }
    }
  };

  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });

  $('.video-list').addEventListener('scroll', e => {
    handleScroll(e);
  });

  $('.video-list').addEventListener('click', e => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    const { videoId } = e.target.parentElement.dataset;
    const video = {
      id: videoId,
    };
    const savedStore = store.getLocalStorage();
    if (savedStore) {
      store.setLocalStorage([...savedStore, video]);
      return;
    }
    store.setLocalStorage([video]);
  });
}

App();
