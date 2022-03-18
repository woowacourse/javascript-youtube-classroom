import 'regenerator-runtime';
import { MESSAGE } from '../constants';
import { skeleton } from '../ui/skeleton';

const BASE_URL = 'https://mincho-youtube.netlify.app/youtube/v3/search';
const parameters = {
  part: 'snippet',
  maxResults: 10,
  type: 'video',
  q: null,
  pageToken: '',
};

const request = async (searchText, nextPageToken = '') => {
  const url = new URL(BASE_URL);
  const searchParams = new URLSearchParams({
    ...parameters,
    q: searchText,
    pageToken: nextPageToken,
  });
  url.search = searchParams.toString();

  try {
    const response = await fetch(url);
    if (response.ok) {
      const videoData = await response.json();
      return videoData;
    }
  } catch {
    skeleton.removeSkeletonUI();
    throw new Error(MESSAGE.ERROR_GET_REQUEST);
  }
};

export { request };
