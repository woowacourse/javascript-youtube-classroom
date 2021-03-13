import { YOUTUBE_BASE_URL, YOUTUBE_QUERY } from './constants/API.js';
import { FETCH_VIDEO_COUNT } from './constants/classroom.js';
import { getQueryString } from './utils/queryString.js';

function fetchSearchResult(keyword = '', nextPageToken = '') {
  const query = {
    part: YOUTUBE_QUERY.PART.SNIPPET,
    order: YOUTUBE_QUERY.ORDER.VIEW_COUNT,
    maxResults: FETCH_VIDEO_COUNT,
    key: process.env.API_KEY ?? '',
    pageToken: nextPageToken,
    q: keyword,
  };
  const queryString = getQueryString(query);

  return fetch(`${YOUTUBE_BASE_URL}/search?${queryString}`)
    .then(data => data.json())
    .catch(e => console.error(e));
}

function fetchLatestVideoInfos(videoIds = []) {
  const query = {
    part: YOUTUBE_QUERY.PART.SNIPPET,
    id: videoIds,
    key: process.env.API_KEY ?? '',
  };
  const queryString = getQueryString(query);

  return fetch(`${YOUTUBE_BASE_URL}/videos?${queryString}`)
    .then(data => data.json())
    .catch(e => console.error(e));
}

export { fetchSearchResult, fetchLatestVideoInfos };
