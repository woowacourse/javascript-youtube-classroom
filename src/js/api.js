import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { getUrlSearchParams } from '@Utils/ManageData';

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) throw new Error('서버 오류가 발생되었습니다.');
  const data = await response.json();

  return data;
};

export const requestYoutubeSearch = async (keyword = '', nextPageToken = '') => {
  try {
    const url = getUrlSearchParams('https://www.googleapis.com/youtube/v3/search', {
      part: 'snippet',
      type: 'video',
      q: keyword,
      maxResults: CLASS_ROOM_SETTING.MAX_VIDEO_NUMBER,
      key: process.env.YOUTUBE_API_KEY,
      pageToken: nextPageToken,
    });

    const response = await request(url, {
      method: 'GET',
    });

    return response;
  } catch (error) {
    return { error: true };
  }
};

export const requestYoutubeList = async (list = []) => {
  try {
    const url = getUrlSearchParams('https://www.googleapis.com/youtube/v3/videos', {
      part: 'snippet',
      id: list.join(','),
      key: process.env.YOUTUBE_API_KEY,
    });

    const response = await request(url, {
      method: 'GET',
    });

    return response;
  } catch (error) {
    return { error: true };
  }
};
