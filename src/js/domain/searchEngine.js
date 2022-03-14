import fetch from 'node-fetch';
import { ERROR_MESSAGE, VIDEO_COUNT } from '../util/constants.js';

export default class SearchEngine {
  #pageToken = null;

  get pageToken() {
    return this.#pageToken;
  }

  set pageToken(pageToken) {
    this.#pageToken = pageToken;
  }

  resetPageToken() {
    this.#pageToken = null;
  }

  async searchKeyword(keyword) {
    const YOUTUBE_API_URL = this.#getYoutubeApiUrl(keyword);
    const response = await fetch(YOUTUBE_API_URL);

    if (response.ok) {
      const json = await response.json();
      this.#pageToken = json.nextPageToken;

      return this.#isDataExist(json) ? json.items : null;
    }

    throw Error(ERROR_MESSAGE.SEARCH_NOT_WORKING);
  }

  #isDataExist(data) {
    return Object.keys(data.items[0]).includes('snippet');
  }

  #getYoutubeApiUrl(keyword) {
    let YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet&maxResults=${VIDEO_COUNT}`;

    if (this.#pageToken) {
      YOUTUBE_API_URL += `&pageToken=${this.#pageToken}`;
    }

    return YOUTUBE_API_URL;
  }
}
