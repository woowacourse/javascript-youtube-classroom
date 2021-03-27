import { YOUTUBE } from '../constants.js';

// TODO: nextPageToken 업데이트 안되는 문제 해결
export async function getVideosByKeyword(searchKeyword, pageToken) {
  const query = getQuery(searchKeyword, pageToken)
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${parseQuery(query)}`);
  const data = await response.json();
  const { nextPageToken } = data;
  const videos = data.items.map(({ id, snippet }) => getVideoItem(id, snippet));
  return {
    nextPageToken,
    videos,
  };
}

function getQuery(searchKeyword, pageToken) {
  return {
    part: 'snippet',
    q: searchKeyword,
    type: 'video',
    maxResults: YOUTUBE.MAX_RESULT_COUNT,
    videoDefinition: 'high',
    key: YOUTUBE_API_KEY,
    pageToken: pageToken ? pageToken : ''
  };
}

function getVideoItem(id, snippet) {
  return {
    videoId: id.videoId,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    publishedAt: snippet.publishedAt,
    thumbnail: snippet.thumbnails.medium.url,
  }
}

function parseQuery(query) {
  return Object.keys(query)
    .map(key => {
      return `${key}=${query[key]}`;
    })
    .join('&');
}