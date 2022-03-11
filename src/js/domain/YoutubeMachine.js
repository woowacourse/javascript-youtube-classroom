import { validateInput } from '../util/general.js';

export default class YoutubeMachine {
  #data = {};
  #searchTarget = '';

  set searchTarget(searchInput) {
    validateInput(searchInput);
    this.#searchTarget = searchInput;
  }

  get searchTarget() {
    return this.#searchTarget;
  }

  set data(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }
  getURL(nextPageToken) {
    const URL = `https://ahns.netlify.app/youtube/v3/search?part=snippet&q=${this.searchTarget}&maxResults=10&type=video`;
    if (nextPageToken) {
      return URL.concat(`&pageToken=${nextPageToken}`);
    }
    return URL;
  }

  updateData(response) {
    response.then(data => {
      this.data = data;
    });
  }

  callSearchAPI() {
    const URL = this.#data ? this.getURL(this.#data.nextPageToken) : this.getURL();
    return fetch(URL).then(response => response.json());
  }

  resetData() {
    this.#data = {};
  }
}
