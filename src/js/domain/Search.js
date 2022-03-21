import storage from './storage';
import { SEARCH_URL_BASE, MAX_SEARCH_RESULT, ERROR_MESSAGES } from '../constants/constants';

class Search {
  constructor() {
    this.keyword = null;
    this.nextPageToken = null;
  }

  async getSearchResultArray(keyword, pageToken = undefined) {
    try {
      const { items, nextPageToken } = await this.#getSearchResult(keyword, pageToken);
      this.keyword = keyword;
      this.nextPageToken = nextPageToken;
      return this.#getVideoObjectArray(items);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getLoadMoreResultArray() {
    const searchResultArray = await this.getSearchResultArray(this.keyword, this.nextPageToken);
    if (this.nextPageToken === undefined) return null;
    return searchResultArray;
  }

  async #getSearchResult(keyword, pageToken) {
    const query = {
      q: keyword,
      maxResults: MAX_SEARCH_RESULT,
      order: 'viewCount',
      type: 'video',
      regionCode: 'KR',
      pageToken,
    };
    try {
      const queryString = this.#generateQueryString(query);
      const response = await fetch(`${SEARCH_URL_BASE}${queryString}`);
      const { items, nextPageToken } = await response.json();
      return { items, nextPageToken };
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SERVER_MALFUNCTION);
    }
  }

  #generateQueryString(query) {
    return Object.keys(query).reduce(
      (str, key) => (query[key] ? `${str}&${key}=${query[key]}` : `${str}`),
      ''
    );
  }

  #getVideoObjectArray(itemArray) {
    return itemArray.map((item) => {
      const { snippet, id } = item;
      return {
        videoId: id.videoId,
        thumbnail: snippet.thumbnails.medium.url,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        isSaved: !!storage.isSavedVideo(id.videoId),
      };
    });
  }
}

export default Search;
