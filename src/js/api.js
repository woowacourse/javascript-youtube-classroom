import { CLASS_ROOM_SETTING } from '@Constants/Setting';

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (response.ok === false) throw new Error('서버 오류');
  const data = await response.json();

  return data;
};

export const requestYoutubeSearch = async (keyword = '', nextPageToken = '') => {
  try {
    const response = await request(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        keyword,
      )}&maxResults=${CLASS_ROOM_SETTING.MAX_VIDEO_NUMBER}&key=${
        process.env.YOUTUBE_API_KEY
      }&pageToken=${nextPageToken}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (error) {
    return { error: true };
  }
};
