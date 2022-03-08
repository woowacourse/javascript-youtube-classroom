import { API_KEY } from '../api.js';
import { $, $$ } from './util/dom.js';

export default function App() {
  $('#search-modal-button').addEventListener('click', () => {
    $('.modal-container').classList.toggle('hide');
  });

  const validateInput = input => {
    if (input === '') {
      throw new Error('빈값을 입력할 수 없습니다. 다시 입력해 주세요.');
    }
  };

  $('#search-button').addEventListener('click', () => {
    try {
      const searchInput = $('#search-input-keyword').value.trim();
      validateInput(searchInput);
      const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&maxResults=10&type=video&key=${API_KEY}`;
      fetch(URL)
        .then(response => response.json())
        .then(data => console.log(data.items))
        .catch(error => console.log('error:', error));
    } catch (error) {
      alert(error.message);
    }
  });
}

App();
