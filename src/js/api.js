import { YOUTUBE_SETTING, YOUTUBE_SEARCH_ACTION } from '@Constants';
import { uriBuilder } from '@Utils/dataManager';
import YoutubeSearchStore from '@Domain/YoutubeSearchStore';

const controller = new AbortController();
const { signal } = controller;
const timeout = 8000;

const request = async (uri, options) => {
  const timer = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(uri, { ...options, signal });

  if (!response.ok) throw new Error('서버 오류');
  const data = await response.json();
  clearTimeout(timer);
  return data;
};

export const requestYoutubeSearch = async (keyword = '', pageToken = '') => {
  try {
    const uri = uriBuilder(YOUTUBE_SETTING.URI, {
      part: 'snippet',
      type: 'video',
      q: keyword,
      maxResults: YOUTUBE_SETTING.MAX_VIDEO_NUMBER,
      key: process.env.YOUTUBE_API_KEY,
      pageToken,
    });
    const response = await request(uri, {
      method: 'GET',
    });
    return YoutubeSearchStore.dispatch(
      YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_SUCCESS,
      response,
    );
  } catch (error) {
    return YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_FAIL);
  }
};
