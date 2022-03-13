import storage from './storage';
import { SEARCH_URL_BASE, MAX_SEARCH_RESULT, ERROR_MESSAGES } from '../constants/constants';

class Search {
  constructor() {
    this.keyword = null;
    this.nextPageToken = null;
  }

  async handleSearchRequest(keyword = this.keyword, pageToken = undefined) {
    try {
      const { items, nextPageToken } = await this.#getSearchResult(keyword, pageToken);
      this.keyword = keyword;
      this.nextPageToken = nextPageToken;
      const savedVideos = storage.getSavedVideos();
      return {
        searchResultArray: this.#getVideoObjectArray(items, savedVideos),
        hasNextPage: !!nextPageToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async #getSearchResult(keyword, pageToken) {
    const queryString = this.#generateQueryString(keyword, pageToken);
    try {
      const response = await fetch(`${SEARCH_URL_BASE}${queryString}`);
      const { items, nextPageToken } = await response.json();
      return { items, nextPageToken };
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  #generateQueryString(keyword, pageToken) {
    const query = {
      q: keyword,
      pageToken,
      maxResults: MAX_SEARCH_RESULT,
      type: 'video',
      regionCode: 'KR',
    };
    return Object.keys(query).reduce(
      (str, key) => (query[key] ? `${str}&${key}=${query[key]}` : `${str}`),
      ''
    );
  }

  #getVideoObjectArray(items, savedVideos) {
    if (items.length === 0) throw new Error(ERROR_MESSAGES.NO_RESULT);
    return items.map((item) => {
      const { snippet, id } = item;
      return {
        videoId: id.videoId,
        thumbnail: snippet.thumbnails.medium.url,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        isSaved: !!savedVideos.includes(id.videoId),
      };
    });
  }
}

export default Search;
