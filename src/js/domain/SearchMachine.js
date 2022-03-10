import youtubeSearchAPI from '../api/youtubeSearchapi.js';
import { checkValidSearchInput, checkMaxStorageVolume } from '../util/validator.js';
import { getLocalStorage, setLocalStorage } from './localStorage.js';
import VideoFactory from './VideoFactory.js';

export default class SearchMachine {
  #keyword;

  #pageToken;

  constructor() {
    this.#pageToken = '';
    this.#keyword = '';
  }

  set keyword(value) {
    checkValidSearchInput(value);
    this.#keyword = value;
  }

  async search() {
    const data = await youtubeSearchAPI.searchByPage(this.#keyword, this.#pageToken);
    this.#pageToken = data.nextPageToken;
    return data.items.map((item) => VideoFactory.generate(item));
  }

  initPageToken() {
    this.#pageToken = '';
  }

  saveVideoToLocalStorage(newVideo) {
    checkMaxStorageVolume();
    const savedVideos = getLocalStorage('save');

    setLocalStorage('save', savedVideos.concat(newVideo));
  }
}
