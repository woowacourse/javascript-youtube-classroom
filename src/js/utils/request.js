/* eslint-disable max-lines-per-function */
import { SERVER_URL, MAX_RENDER_VIDEOS_COUNT } from '../constants/constant';

export const searchResultRequest = async (query, nextPageToken) => {
  try {
    const url = new URL(SERVER_URL);
    const parameters = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: MAX_RENDER_VIDEOS_COUNT,
      regionCode: 'kr',
      safeSearch: 'strict',
      pageToken: nextPageToken || '',
      q: query,
    });
    url.search = parameters.toString();

    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error.message);
    }
    return body;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSaveVideoList = async videoIdList => {
  try {
    const url = new URL(SERVER_URL);
    const parameters = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: MAX_RENDER_VIDEOS_COUNT,
      regionCode: 'kr',
      safeSearch: 'strict',
      id: videoIdList.join(','),
    });
    url.search = parameters.toString();

    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error.message);
    }
    return body;
  } catch (error) {
    console.error(error);
    return null;
  }
};