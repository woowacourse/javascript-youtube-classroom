import { $ } from './util/dom.js';
import YoutubeMachine from './domain/YoutubeMachine.js';
import { renderSkeletonUI, removeSkeletonUI, renderVideoItems } from './UI/renderVideoItems.js';
import '../css/index.css';

export default function App() {
  renderSkeletonUI();

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
      youtubeMachine.data = youtubeMachine.getSearchData();
      renderVideoItems(youtubeMachine.data);
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
}

App();
