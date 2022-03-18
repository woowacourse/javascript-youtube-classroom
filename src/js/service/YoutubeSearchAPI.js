import { ERROR } from '../constants/error';

export default class YoutubeSearchAPI {
  #searchResults = {};

  set searchResults(searchResults) {
    this.#searchResults = searchResults;
  }

  get searchResults() {
    return this.#searchResults;
  }

  resetSearchResults() {
    this.#searchResults = {};
  }

  updateSearchResults(response) {
    response.then(searchResults => {
      this.searchResults = searchResults;
    });
  }

  getURL(searchKeyword, nextPageToken) {
    const url = new URL('youtube/v3/search', 'https://onstar.netlify.app');
    const parameter = new URLSearchParams({
      part: 'snippet',
      maxResults: 10,
      q: searchKeyword,
      pageToken: nextPageToken || '',
      type: 'video',
    });
    url.search = parameter.toString();
    return url.href;
  }

  callSearchAPI(searchKeyword) {
    const URL = this.#searchResults
      ? this.getURL(searchKeyword, this.#searchResults.nextPageToken)
      : this.getURL(searchKeyword);
    return fetch(URL).then(response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === ERROR.CODE.API_DISABLE) {
        throw new Error(ERROR.MESSAGE.API_DISABLE);
      }
    });
  }
}
