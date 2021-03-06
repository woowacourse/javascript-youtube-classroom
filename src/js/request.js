import youtubeKey from '../../youtubeAPI.js';
import { SEARCH_URL, VIDEO_URL } from '../js/utils/constants.js';

export function searchRequest(keyword, pageToken, callback) {
  const requestURL = pageToken
    ? `${SEARCH_URL}&key=${youtubeKey}&q=${keyword}&pageToken=${pageToken}`
    : `${SEARCH_URL}&key=${youtubeKey}&q=${keyword}`;

  fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      callback(res);
    });
}

export function videoRequest(videoIds, callback) {
  const requestURL = `${VIDEO_URL}&key=${youtubeKey}&id=${videoIds.join(',')}`;

  fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      callback(res);
    });
}
