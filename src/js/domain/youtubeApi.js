import 'regenerator-runtime';
import { GET_VIDEO_UNIT, MESSAGE } from '../constants';

const request = async (searchText, nextPageToken = '') => {
  const response = await fetch(
    `https://halee-youtube-api.netlify.app/youtube/v3/search?part=snippet&q=${searchText}&maxResults=${GET_VIDEO_UNIT}&type=video&pageToken=${nextPageToken}`,
  );

  if (response.status === 200) {
    const searchResult = await response.json();
    return searchResult;
  }
  throw new Error(MESSAGE.ERROR_GET_REQUEST);
};

export { request };
