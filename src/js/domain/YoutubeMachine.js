import { API } from '../constants/constants.js';
import { validateInput } from '../util/general.js';

export default class YoutubeMachine {
  #searchResult = {};
  #searchTarget = '';

  set searchResult(searchResult) {
    this.#searchResult = searchResult;
  }
  get searchResult() {
    return this.#searchResult;
  }

  search(searchInput) {
    validateInput(searchInput);
    this.#searchTarget = searchInput;
    this.updateSearchResult(this.callSearchAPI());
  }

  searchScrollingResult() {
    this.updateSearchResult(this.callSearchAPI());
  }

  getURL(nextPageToken) {
    const url = new URL(API.RELATIVE_URL, API.BASE_URL);
    const parameter = new URLSearchParams({
      part: 'snippet',
      maxResults: API.MAX_RESULT,
      q: this.#searchTarget,
      pageToken: nextPageToken || '',
      type: API.SEARCH_TYPE,
    });
    url.search = parameter.toString();

    return url;
  }

  async callSearchAPI() {
    const URL = this.#searchResult ? this.getURL(this.#searchResult.nextPageToken) : this.getURL();
    const response = await fetch(URL);
    const searchResult = await response.json();
    return searchResult;
  }
  updateSearchResult(response) {
    this.#searchResult = response;
  }

  resetSearchResult() {
    this.#searchResult = {};
    this.#searchTarget = '';
  }
}
