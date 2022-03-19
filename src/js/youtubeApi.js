import { MAX_DATA_FETCH_AT_ONCE, REQUEST_PATH, HOST_URL, SECOND_HOST_URL } from './constants';

const createAPI = (keyword, pageToken, dummy) => {
  const url = new URL(`${dummy ? `dummy/${REQUEST_PATH}` : REQUEST_PATH}`, SECOND_HOST_URL);
  const parameter = new URLSearchParams({
    part: 'snippet',
    maxResults: MAX_DATA_FETCH_AT_ONCE,
    pageToken: pageToken || '',
    q: keyword,
    type: 'video',
  });

  url.search = parameter.toString();
  return url;
};

export const YOUTUBE_API_ENDPOINT = (keyword, pageToken) => createAPI(keyword, pageToken, false);
export const DUMMY_YOUTUBE_API_ENDPOINT = (keyword, pageToken) => createAPI(keyword, pageToken, true);
