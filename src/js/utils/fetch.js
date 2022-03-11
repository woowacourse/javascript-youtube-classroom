// eslint-disable-next-line import/prefer-default-export
export const fetchYoutubeApi = async (query, nextPageToken) => {
  try {
    const REDIRECT_SERVER_HOST = 'https://thirsty-ritchie-0c8419.netlify.app/';

    const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
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
    // this.#fetchedVideos = body;
    return body;
  } catch (error) {
    console.error(error);
  }
};
