import youtubeKey from '../../youtubeAPI.js';
import { SEARCH_URL, VIDEO_URL, VALUE } from '../js/utils/constants.js';

function generateSearchURL(keyword, pageToken) {
  const searchParams = new URLSearchParams({
    key: youtubeKey,
    type: 'video',
    part: 'snippet',
    maxResults: VALUE.CLIPS_PER_SCROLL,
    q: keyword,
  });

  if (pageToken) {
    searchParams.set('pageToken', pageToken);
  }

  return SEARCH_URL + searchParams;
}

export async function searchRequest(keyword, pageToken) {
  const requestURL = generateSearchURL(keyword, pageToken);
  const response = await fetch(requestURL).then((response) => response.json());

  return response;
}

function generateVideoURL(videoIds) {
  const searchParams = new URLSearchParams({
    key: youtubeKey,
    part: 'snippet',
    id: videoIds.join(','),
  });

  return VIDEO_URL + searchParams;
}

export async function videoRequest(videoIds) {
  const requestURL = generateVideoURL(videoIds);
  const response = await fetch(requestURL).then((response) => response.json());

  return response;
}
