function generateQueryString(query) {
  return Object.keys(query).reduce(
    (str, key) => (query[key] ? `${str}&${key}=${query[key]}` : `${str}`),
    ''
  );
}

async function searchYoutube(keyword, pageToken) {
  const URL_BASE = 'https://pensive-fermat-630884.netlify.app/youtube/v3/search?part=snippet';
  const query = {
    q: keyword,
    maxResults: 10,
    order: 'viewCount',
    type: 'video',
    regionCode: 'KR',
    pageToken,
  };
  const queryString = generateQueryString(query);
  const response = await fetch(`${URL_BASE}${queryString}`);
  const { items, nextPageToken } = await response.json();
  return { items, nextPageToken };
}

export const getVideoObjects = (items) =>
  items.map((item) => {
    const {
      id: { videoId },
      snippet: {
        thumbnails: {
          medium: { url: thumbnail },
        },
        title,
        channelTitle,
        publishedAt,
      },
    } = item;
    return { videoId, thumbnail, title, channelTitle, publishedAt };
  });

export default async function handleSearchRequest(keyword, pageToken) {
  const { items, nextPageToken } = await searchYoutube(keyword, pageToken);
  return { searchResultArray: getVideoObjects(items), nextPageToken };
}
