import { API_KEY } from '../api.js';
import { $ } from './util/dom.js';
import dummyData from '../../dummyData.js';

const getURL = (searchInput, nextPageToken) => {
  const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&maxResults=10&type=video&key=${API_KEY}`;
  if (nextPageToken) {
    return URL.concat(`&pageToken=${nextPageToken}`);
  }
  return URL;
};

const getSearchData = searchInput => {
  const URL = getURL(searchInput);
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log(data.items);
    })
    .catch(error => console.log('error:', error));
};

const getNextSearchData = ({ nextPageToken }) => {
  const nextURL = URL + `&pageToken=${nextPageToken}`;
  fetch(nextURL)
    .then(response => response.json())
    .then(data => console.log(data.items))
    .catch(error => console.log('error:', error));
};

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
      getSearchData(searchInput);
    } catch (error) {
      alert(error.message);
    }
  });
}

App();
