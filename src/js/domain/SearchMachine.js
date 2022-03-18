import youtubeSearchAPI from '../api/youtubeSearchapi.js';
import { LOCALSTORAGE_KEY_SAVE } from '../constant/index.js';
import {
  checkValidSearchInput,
  checkMaxStorageVolume,
} from '../util/validator.js';
import { getLocalStorage, setLocalStorage } from './localStorage.js';
import VideoFactory from './VideoFactory.js';

export default class SearchMachine {
  #keyword;

  #pageToken;

  constructor() {
    this.#pageToken = '';
    this.#keyword = '';
  }

  get keyword() {
    return this.#keyword;
  }
  get pageToken() {
    return this.#pageToken;
  }
  set keyword(value) {
    checkValidSearchInput(value);
    this.#keyword = value;
  }

  async search() {
    const data = await youtubeSearchAPI.searchByPage(
      this.#keyword,
      this.#pageToken,
    );

    if (data.nextPageToken === undefined) throw new Error();
    this.#pageToken = data.nextPageToken;
    console.log(data.nextPageToken);
    return data.items.map((item) => VideoFactory.generate(item));
  }

  initPageToken() {
    this.#pageToken = '';
  }

  saveVideoToLocalStorage(newVideo) {
    checkMaxStorageVolume();
    const savedVideos = getLocalStorage(LOCALSTORAGE_KEY_SAVE);

    setLocalStorage(LOCALSTORAGE_KEY_SAVE, savedVideos.concat(newVideo));
  }
}
