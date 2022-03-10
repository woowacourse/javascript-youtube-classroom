import 'regenerator-runtime';
import { MESSAGE } from '../constants';

const request = async (searchText, key, nextPageToken = '') => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&key=${key}&maxResults=10&type=video&pageToken=${nextPageToken}`,
  );
  if (response.status === 200) {
    const searchResult = await response.json();
    return searchResult;
  }
  throw new Error(MESSAGE.ERROR_GET_REQUEST);
};

export { request };
