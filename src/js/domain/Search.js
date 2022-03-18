import { SEARCH_URL_BASE, MAX_SEARCH_RESULT, ERROR_MESSAGES } from '../constants/constants';
import { getAllFromStorage } from './storage';
import getVideoObjectArray from './utils/getVideoObjectArray';

class Search {
  #keyword;

  #nextPageToken;

  constructor() {
    this.#keyword = null;
    this.#nextPageToken = null;
  }

  async handleSearchRequest(keyword = this.#keyword) {
    try {
      const { items, nextPageToken } = await this.#getSearchResult(keyword, this.#nextPageToken);
      this.#keyword = keyword;
      this.#nextPageToken = nextPageToken;

      const savedVideos = Object.keys(getAllFromStorage());
      const searchResultArray = getVideoObjectArray(items, savedVideos);

      return { searchResultArray, hasNextPage: !!nextPageToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async #getSearchResult(keyword, pageToken) {
    const queryString = this.#generateQueryString(keyword, pageToken);

    try {
      const response = await fetch(`${SEARCH_URL_BASE}${queryString}`);
      if (!response.ok) throw new Error(response);

      const { items, nextPageToken } = await response.json();

      return { items, nextPageToken };
    } catch (error) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  #generateQueryString(keyword, pageToken) {
    const queryString = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      regionCode: 'KR',
      maxResults: MAX_SEARCH_RESULT,
      q: keyword,
    });

    if (pageToken) queryString.append('pageToken', pageToken);

    return queryString;
  }
}

export default Search;
