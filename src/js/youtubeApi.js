import { MAX_DATA_FETCH_AT_ONCE } from './constants';

const REQUEST_PATH = 'youtube/v3/search';
const HOST_URL = 'https://brave-lichterman-77e301.netlify.app/';

export const YOUTUBE_API_ENDPOINT = (keyword, pageToken) => {
  const url = new URL(REQUEST_PATH, HOST_URL);
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

export const DUMMY_YOUTUBE_API_ENDPOINT = (keyword, pageToken) => {
  const url = new URL(`dummy/${REQUEST_PATH}`, HOST_URL);
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
