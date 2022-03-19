import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../constants/youtubeApi';

// eslint-disable-next-line import/prefer-default-export
export const fetchYoutubeApi = async (query, nextPageToken) => {
  try {
    const url = new URL(YOUTUBE_SEARCH_PATH, REDIRECT_SERVER_HOST);
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

    const response = await fetch(url, { method: 'GET' });
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error.message);
    }

    return body;
  } catch (error) {
    console.error(error);
  }
};
