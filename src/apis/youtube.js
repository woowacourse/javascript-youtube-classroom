import { YOUTUBE } from '../constants.js';

export async function getVideosByKeyword(searchKeyword, pageToken) {
  const query = {
    part: 'snippet',
    q: searchKeyword,
    type: 'video',
    maxResults: YOUTUBE.MAX_RESULT_COUNT,
    videoDefinition: 'high',
    key: YOUTUBE_API_KEY,
  };
  let response;

  try {
    response = await (
      await fetch(
        `https://www.googleapis.com/youtube/v3/search?${parseQuery(query)}${pageToken ? `&pageToken=${pageToken}` : ''
        }`
      )
    ).json();
  } catch (err) {
    throw new Error(err);
  }

  const { nextPageToken } = response;
  const videos = response.items.map(({ id, snippet }) => ({
    videoId: id.videoId,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    publishedAt: snippet.publishedAt,
  }));

  return {
    nextPageToken,
    videos,
  };
}

function parseQuery(query) {
  return Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');
}
