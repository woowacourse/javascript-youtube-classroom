import {
  SEARCH_URL,
  VIDEO_URL,
  ERROR_MESSAGES,
  VALUE,
} from '../js/utils/constants.js';

export async function searchRequest(keyword, pageToken) {
  const searchParams = new URLSearchParams({
    type: 'video',
    part: 'snippet',
    maxResults: VALUE.CLIPS_PER_SCROLL,
    q: keyword,
  });

  if (pageToken) {
    searchParams.set('pageToken', pageToken);
  }

  const requestURL = SEARCH_URL + searchParams;

  return await httpRequest(requestURL);
}

export async function videoRequest(videoIds) {
  const searchParams = new URLSearchParams({
    part: 'snippet',
    id: videoIds.join(','),
  });

  const requestURL = VIDEO_URL + searchParams;

  return await httpRequest(requestURL);
}

async function httpRequest(requestURL) {
  try {
    const response = await fetch(requestURL);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(ERROR_MESSAGES.EXCEED_API_QUOTA);
      }
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}
