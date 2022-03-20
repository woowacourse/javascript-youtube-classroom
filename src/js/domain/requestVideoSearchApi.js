import 'regenerator-runtime';
import { MESSAGE } from '../constants';

const BASE_URL = 'https://mincho-youtube.netlify.app/dummy/youtube/v3/search';
const parameters = {
  part: 'snippet',
  maxResults: 10,
  type: 'video',
  q: null,
  pageToken: '',
};

const requestVideoSearchApi = async (searchText, nextPageToken = '') => {
  const url = new URL(BASE_URL);
  const searchParams = new URLSearchParams({
    ...parameters,
    q: searchText,
    pageToken: nextPageToken,
  });
  url.search = searchParams.toString();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(MESSAGE.NOT_RESPONSE_OK + response.status);
    }
    const videoData = await response.json();
    return videoData;
  } catch (error) {
    console.error(error);
    throw new Error(MESSAGE.ERROR_GET_REQUEST);
  }
};

export { requestVideoSearchApi };
