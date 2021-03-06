import youtubeKey from '../../youtubeAPI.js';
import { SEARCH_URL, VIDEO_URL, VALUE } from '../js/utils/constants.js';

function generateSearchURL(keyword, pageToken) {
  const searchParams = new URLSearchParams({
    key: youtubeKey,
    type: 'video',
    part: 'snippet',
    maxResults: VALUE.CLIPS_PER_SCROLL,
    q: keyword,
  });

  if (pageToken) {
    searchParams.set('pageToken', pageToken);
  }

  return SEARCH_URL + searchParams;
}

export function searchRequest(keyword, pageToken, callback) {
  const requestURL = generateSearchURL(keyword, pageToken);

  fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      callback(res);
    });
}

function generateVideoURL(videoIds) {
  const searchParams = new URLSearchParams({
    key: youtubeKey,
    part: 'snippet',
    id: videoIds.join(','),
  });

  return VIDEO_URL + searchParams;
}

export function videoRequest(videoIds, callback) {
  const requestURL = generateVideoURL(videoIds);

  fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      callback(res);
    });
}
