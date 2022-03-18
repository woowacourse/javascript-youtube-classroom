import 'regenerator-runtime';
import { MESSAGE } from '../constants';
import { skeletonUI } from '../ui/skeletonUI';

const BASE_URL = 'https://mincho-youtube.netlify.app/dummy/youtube/v3/search';
const parameters = {
  part: 'snippet',
  maxResults: 10,
  type: 'video',
  q: null,
  pageToken: '',
};

const requestApi = async (searchText, nextPageToken = '') => {
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
      throw new Error('');
    }
    const videoData = await response.json();
    return videoData;
  } catch {
    skeletonUI.remove();
    throw new Error(MESSAGE.ERROR_GET_REQUEST);
  }
};

export { requestApi };
