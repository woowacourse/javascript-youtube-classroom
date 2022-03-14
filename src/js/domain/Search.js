import storage from './storage';
import { SEARCH_URL_BASE, MAX_SEARCH_RESULT } from '../constants/constants';

class Search {
  constructor() {
    this.keyword = null;
    this.nextPageToken = null;
  }

  async getSearchResultArray(keyword, pageToken = undefined) {
    const { items, nextPageToken } = await this.#getSearchResult(keyword, pageToken);
    this.keyword = keyword;
    this.nextPageToken = nextPageToken;
    const savedVideos = storage.getSavedVideos() || {};
    return { searchResultArray: this.#getVideoObjectArray(items, savedVideos), nextPageToken };
  }

  async getLoadMoreResultArray() {
    if (this.nextPageToken === undefined) return null;
    const { searchResultArray } = await this.getSearchResultArray(this.keyword, this.nextPageToken);
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
    const queryString = this.#generateQueryString(query);
    const response = await fetch(`${SEARCH_URL_BASE}${queryString}`);
    const { items, nextPageToken } = await response.json();
    return { items, nextPageToken };
  }

  #generateQueryString(query) {
    return Object.keys(query).reduce(
      (str, key) => (query[key] ? `${str}&${key}=${query[key]}` : `${str}`),
      ''
    );
  }

  #getVideoObjectArray(items, savedVideos) {
    return items.map((item) => {
      const { snippet, id } = item;
      return {
        videoId: id.videoId,
        thumbnail: snippet.thumbnails.medium.url,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        isSaved: !!savedVideos[id.videoId],
      };
    });
  }
}

export default Search;
