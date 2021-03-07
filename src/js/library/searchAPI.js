import API_KEY from '../apiKey.js';
import YOUTUBE_SEARCH_BASE_URL from './constants/api.js';
import { FETCH_VIDEO_COUNT } from './constants/classroom.js';

function fetchSearchResult(keyword, nextPageToken = '') {
  return fetch(
    `${YOUTUBE_SEARCH_BASE_URL}&maxResults=${FETCH_VIDEO_COUNT}&key=${API_KEY}&pageToken=${nextPageToken}&q=${keyword}`
  )
    .then(data => {
      return data.json();
    })
    .catch(e => {
      console.error(e);
    });
}

export default fetchSearchResult;
