import { $ } from './util/dom.js';
import YoutubeMachine from './domain/YoutubeMachine.js';
import {
  renderSkeletonUI,
  removeSkeletonUI,
  renderVideoItems,
  renderNoResult,
} from './UI/renderVideoItems.js';
import '../css/index.css';
import '../assets/images/not_found.png';
import dummyData from '../../dummyData.js';

export default function App() {
  const youtubeMachine = new YoutubeMachine();

  const validateInput = input => {
    if (input === '') {
      throw new Error('빈값을 입력할 수 없습니다. 다시 입력해 주세요.');
    }
  };

  const handleSearch = () => {
    try {
      const searchInput = $('#search-input-keyword').value.trim();
      validateInput(searchInput);
      youtubeMachine.searchTarget = searchInput;
      // const responseJSON = youtubeMachine.getSearchData();
      // responseJSON
      //   .then(data => {
      //     // 비디오 렌더링s
      //     renderSkeletonUI();
      //     renderVideoItems(data);
      //     console.log(data.items);
      //   })
      //   .catch(error => {
      //     // 검색결과없음
      //     renderNoResult();
      //     // console.log('error:', error);
      //   });
      renderSkeletonUI();
      renderVideoItems(dummyData);
    } catch (error) {
      alert(error.message);
    }
  };

  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });

  let throttle;
  let maxScrollTop = 0;
  $('.video-list').addEventListener('scroll', e => {
    if (e.target.scrollTop > maxScrollTop) {
      maxScrollTop = e.target.scrollTop - 50;
      if (!throttle) {
        renderSkeletonUI();
        throttle = setTimeout(() => {
          throttle = null;
        }, 2000);
      }
    }
  });
}

App();
