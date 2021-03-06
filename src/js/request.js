import youtubeKey from '../../youtubeAPI.js';
import { SEARCH_URL, VIDEO_URL } from '../js/utils/constants.js';

function generateSearchURL(keyword, pageToken) {
  return pageToken
    ? `${SEARCH_URL}&key=${youtubeKey}&q=${keyword}&pageToken=${pageToken}`
    : `${SEARCH_URL}&key=${youtubeKey}&q=${keyword}`;
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
  return `${VIDEO_URL}&key=${youtubeKey}&id=${videoIds.join(',')}`;
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
