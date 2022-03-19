import { MAX_RENDER_VIDEOS_COUNT } from '../constants/constant';

export const requestApi = async (url, params) => {
  const serverUrl = new URL(url);
  const parameters = new URLSearchParams(params);
  serverUrl.search = parameters.toString();
  try {
    const response = await fetch(serverUrl);
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.error.message);
    }
    return body;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const requestYoutubeVideos = async (url, params) => {
  const queryParams = {
    part: 'snippet',
    type: 'video',
    maxResults: MAX_RENDER_VIDEOS_COUNT,
    regionCode: 'kr',
    safeSearch: 'strict',
    ...params,
  };
  const result = await requestApi(url, queryParams);
  return result;
};
