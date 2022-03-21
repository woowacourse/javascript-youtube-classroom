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
        throw Error(MESSAGE.ERROR_EXCESS_API_QUOTA);
      }
    })
    .catch(error => {
      console.error(error);
      throw Error(MESSAGE.ERROR_GET_REQUEST);
    });

  return searchResult;
};

export { searchVideos };
