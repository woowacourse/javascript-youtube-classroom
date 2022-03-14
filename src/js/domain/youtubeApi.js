import 'regenerator-runtime';
import { MESSAGE } from '../constants';

const request = async (searchText, nextPageToken = '') => {
  try {
    const response = await fetch(
      `https://mincho-youtube.netlify.app/youtube/v3/search?part=snippet&q=${searchText}&maxResults=10&type=video&pageToken=${nextPageToken}`,
    );
    if (response.ok) {
      const searchResult = await response.json();
      return searchResult;
    }
  } catch {
    throw new Error(MESSAGE.ERROR_GET_REQUEST);
  }
};

export { request };
