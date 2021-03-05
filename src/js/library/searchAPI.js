import API_KEY from '../apiKey.js';
import YOUTUBE_SEARCH_API from './constants/api.js';

function fetchSearchResult(keyword, nextPageToken = '') {
  return fetch(
    `${YOUTUBE_SEARCH_API}&key=${API_KEY}&pageToken=${nextPageToken}&q=${keyword}`
  )
    .then(data => {
      return data.json();
    })
    .catch(e => {
      console.error(e);
    });
}

export default fetchSearchResult;
