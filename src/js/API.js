import { YOUTUBE_BASE_URL } from './constants/API.js';
import { FETCH_VIDEO_COUNT } from './constants/classroom.js';

function fetchSearchResult(keyword, nextPageToken = '') {
  const query = `part=snippet&order=viewCount&maxResults=${FETCH_VIDEO_COUNT}&key=${process.env.API_KEY}&pageToken=${nextPageToken}&q=${keyword}`;

  return fetch(`${YOUTUBE_BASE_URL}/search?${query}`)
    .then(data => data.json())
    .catch(e => console.error(e));
}

function fetchLatestVideoInfos(videoIds) {
  const videoIdString = videoIds.join('&id=');
  const query = `part=snippet&id=${videoIdString}&key=${process.env.API_KEY}`;

  return fetch(`${YOUTUBE_BASE_URL}/videos?${query}`)
    .then(data => data.json())
    .catch(e => console.error(e));
}

export { fetchSearchResult, fetchLatestVideoInfos };
