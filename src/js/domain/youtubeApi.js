import 'regenerator-runtime';
import { GET_VIDEO_UNIT, MESSAGE } from '../constants';

const searchVideos = async (searchText, nextPageToken = '') => {
  let searchResult;

  await fetch(
    `https://halee-youtube-api.netlify.app/youtube/v3/search?part=snippet&q=${searchText}&maxResults=${GET_VIDEO_UNIT}&type=video&pageToken=${nextPageToken}`,
  )
    .then(async response => {
      if (response.status === 200) {
        searchResult = await response.json();
      } else if (response.status === 403) {
        throw Error(MESSAGE.ERROR_GET_REQUEST);
      }
    })
    .catch(error => {
      throw Error(error.message);
    });

  return searchResult;
};

const getVideoInfo = async videoId => {
  let searchResult;

  await fetch(
    `https://halee-youtube-api-2.netlify.app/youtube/v3/videos?part=snippet&id=${videoId}`,
  )
    .then(async response => {
      if (response.status === 200) {
        searchResult = await response.json();
      } else if (response.status === 403) {
        throw Error(MESSAGE.ERROR_GET_REQUEST);
      }
    })
    .catch(error => {
      throw Error(error.message);
    });

  return searchResult;
};

export { searchVideos, getVideoInfo };
