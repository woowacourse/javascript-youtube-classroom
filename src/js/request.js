import youtubeKey from '../../youtubeAPI.js';
import { SEARCH_URL, VIDEO_URL } from '../js/utils/constants.js';

export const searchRequest = (keyword, pageToken, callback) => {
  const requestURL = pageToken
    ? `${SEARCH_URL}&key=${youtubeKey}&q=${keyword}&pageToken=${pageToken}`
    : `${SEARCH_URL}&key=${youtubeKey}&q=${keyword}`;

  fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then(function (res) {
      callback(res);
    });
};

export const videoRequest = (videoIds, callback) => {
  const requestURL = `${VIDEO_URL}&key=${youtubeKey}&id=${videoIds.join(',')}`;

  fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then(function (res) {
      callback(res);
    });
};
