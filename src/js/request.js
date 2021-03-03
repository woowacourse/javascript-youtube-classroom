import youtubeKey from '../../youtubeAPI.js';
import { SEARCH_URL } from '../js/utils/constants.js';

export const searchRequest = (keyword, callback) => {
  fetch(`${SEARCH_URL}&key=${youtubeKey}&q=${keyword}`)
    .then((response) => {
      return response.json();
    })
    .then(function (res) {
      callback(res.items);
    });
};
