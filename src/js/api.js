import { YOUTUBE_SETTING } from '@Constants/setting';
import { URIBuilder } from '@Utils/dataManager';

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (response.ok === false) throw new Error('서버 오류');
  const data = await response.json();

  return data;
};

export const requestYoutubeSearch = async (keyword = '', pageToken = '') => {
  try {
    const uri = URIBuilder(YOUTUBE_SETTING.URI, {
      part: 'snippet',
      type: 'video',
      q: encodeURIComponent(keyword),
      maxResults: YOUTUBE_SETTING.MAX_VIDEO_NUMBER,
      key: process.env.YOUTUBE_API_KEY,
      pageToken,
    });
    const response = await request(uri, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    return { error: true };
  }
};
