import { $ } from './util/dom.js';
import YoutubeMachine from './domain/YoutubeMachine.js';

export default function App() {
  const youtubeMachine = new YoutubeMachine();

  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

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
      youtubeMachine.getSearchData();
    } catch (error) {
      alert(error.message);
    }
  };

  $('#search-button').addEventListener('click', handleSearch);

  $('#search-input-keyword').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });
}

App();
