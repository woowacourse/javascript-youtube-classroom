import storage from './storage';
import { SEARCH_URL_BASE, MAX_SEARCH_RESULT, ERROR_MESSAGES } from '../constants/constants';

const search = {
  keyword: null,
  nextPageToken: null,

  getSearchResultArray: async (keyword, pageToken = undefined) => {
    try {
      const { items, nextPageToken } = await search.getSearchResult(keyword, pageToken);
      search.keyword = keyword;
      search.nextPageToken = nextPageToken;
      return search.getVideoObjectArray(items);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getLoadMoreResultArray: async () => {
    const searchResultArray = await search.getSearchResultArray(
      search.keyword,
      search.nextPageToken
    );
    if (search.nextPageToken === undefined) return null;
    return searchResultArray;
  },

  getSearchResult: async (keyword, pageToken) => {
    const query = {
      q: keyword,
      maxResults: MAX_SEARCH_RESULT,
      order: 'viewCount',
      type: 'video',
      regionCode: 'KR',
      pageToken,
    };
    try {
      const queryString = search.generateQueryString(query);
      const response = await fetch(`${SEARCH_URL_BASE}${queryString}`);
      const { items, nextPageToken } = await response.json();
      return { items, nextPageToken };
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SERVER_MALFUNCTION);
    }
  },

  generateQueryString: (query) =>
    Object.keys(query).reduce(
      (str, key) => (query[key] ? `${str}&${key}=${query[key]}` : `${str}`),
      ''
    ),

  getVideoObjectArray: (itemArray) =>
    itemArray.map((item) => {
      const { snippet, id } = item;
      return {
        videoId: id.videoId,
        thumbnail: snippet.thumbnails.medium.url,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        isSaved: !!storage.isSavedVideo(id.videoId),
      };
    }),
};

export default search;
