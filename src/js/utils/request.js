/* eslint-disable max-lines-per-function */
import { MAX_RENDER_VIDEOS_COUNT } from '../constants/constant';

export const searchResultRequest = async (query, nextPageToken) => {
  const url = new URL('https://www.googleapis.com/youtube/v3/search?');
  const parameters = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: MAX_RENDER_VIDEOS_COUNT,
    regionCode: 'kr',
    pageToken: nextPageToken || '',
    q: query,
    key: 'AIzaSyBont2LnhVYyMI4wd6JFZ6AuiJlVxiVrB4',
  });
  url.search = parameters.toString();
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

export const getSaveVideoList = async videoIdList => {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos?');
  const parameters = new URLSearchParams({
    part: 'snippet',
    maxResults: MAX_RENDER_VIDEOS_COUNT,
    regionCode: 'kr',
    id: videoIdList.join(),
    key: 'AIzaSyBont2LnhVYyMI4wd6JFZ6AuiJlVxiVrB4',
  });
  url.search = parameters.toString();
  const response = await fetch(url);
  const body = await response.json();
  return body;
};
