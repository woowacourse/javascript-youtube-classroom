import { SEARCH_RESULT_COUNT } from '../constants/constants.js';
import { validateInput } from '../util/general.js';

export default class YoutubeSearch {
  #pageToken = '';
  #searchTarget = '';

  set searchTarget(searchInput) {
    validateInput(searchInput);
    this.#searchTarget = searchInput;
  }

  get searchTarget() {
    return this.#searchTarget;
  }

  set pageToken(token) {
    this.#pageToken = token;
  }

  get pageToken() {
    return this.#pageToken;
  }

  async fetchYoutubeAPI() {
    const REDIRECT_SERVER_HOST = 'https://ahns.netlify.app/youtube/v3/search';
    const url = new URL(REDIRECT_SERVER_HOST);
    const parameter = new URLSearchParams({
      part: 'snippet',
      maxResults: SEARCH_RESULT_COUNT,
      q: this.#searchTarget,
      regionCode: 'kr',
      pageToken: this.#pageToken || '',
      type: 'video',
    });
    url.search = parameter.toString();

    const response = await fetch(url, { method: 'GET' });
    const videoData = await response.json();
    this.#pageToken = videoData.nextPageToken;
    return videoData;
  }
}
