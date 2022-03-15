import { validateInput } from '../util/general.js';

export default class YoutubeSearchClient {
  #searchResults = {};
  #searchTarget = '';

  set searchTarget(searchInput) {
    validateInput(searchInput);
    this.#searchTarget = searchInput;
  }

  get searchTarget() {
    return this.#searchTarget;
  }

  set searchResults(searchResults) {
    this.#searchResults = searchResults;
  }

  get searchResults() {
    return this.#searchResults;
  }

  getURL(nextPageToken) {
    const url = new URL('youtube/v3/search', 'https://onstar.netlify.app');
    const parameter = new URLSearchParams({
      part: 'snippet',
      maxResults: 10,
      q: this.#searchTarget,
      pageToken: nextPageToken || '',
      type: 'video',
    });
    url.search = parameter.toString();
    return url.href;
  }

  updateSearchResults(response) {
    response.then(searchResults => {
      this.searchResults = searchResults;
    });
  }

  callSearchAPI() {
    const URL = this.#searchResults
      ? this.getURL(this.#searchResults.nextPageToken)
      : this.getURL();
    return fetch(URL).then(response => {
      return response.json();
    });
  }

  resetSearchResults() {
    this.#searchResults = {};
  }
}
