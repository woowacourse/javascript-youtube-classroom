import { REDIRECT_SERVER_HOST } from '../config/config.js';

export const request = async (url) => {
  const res = await fetch(url);
  const body = await res.json();

  if (!res.ok) throw new Error(body.error.message);

  return body;
};

export const getSearchUrl = (query, nextPageToken) => {
  const url = new URL(
    `${
      process.env.NODE_ENV === 'development' ? 'dummy/' : ''
    }youtube/v3/search`,
    REDIRECT_SERVER_HOST
  );

  const parameters = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: nextPageToken || '',
    q: query,
  });

  url.search = parameters.toString();

  return url;
};
