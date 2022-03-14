import { validateInput } from '../util/general.js';
// import dummyData from '../../../dummyData.js';

export default class YoutubeMachine {
  #pageToken = '';
  #searchTarget = '';

  set searchTarget(searchInput) {
    validateInput(searchInput);
    this.#searchTarget = searchInput;
  }

  get searchTarget() {
    return this.#searchTarget;
  }

  set pageToken(data) {
    this.#pageToken = data;
  }

  get pageToken() {
    return this.#pageToken;
  }

  getURL() {
    const URL = `https://ahns.netlify.app/youtube/v3/search?part=snippet&q=${this.searchTarget}&maxResults=10&type=video`;
    if (this.#pageToken) {
      return URL.concat(`&pageToken=${this.#pageToken}`);
    }
    return URL;
  }

  async callSearchAPI() {
    const URL = this.getURL();
    const response = await fetch(URL);
    const videoData = await response.json();
    this.#pageToken = videoData.nextPageToken;
    return videoData;
  }
}
