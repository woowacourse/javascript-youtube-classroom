import fetch from 'node-fetch';
import { YOUTUBE_API_ENDPOINT } from '../youtubeApi';
import { parseVideoInfo } from '../util';
import { ERROR_MESSAGE } from '../constants';

export default class SearchVideoManager {
  #isLastPage;

  constructor() {
    this.keyword = '';
    this.nextPageToken = '';
    this.#isLastPage = false;
    this.totalVideoData = [];
  }

  get isLastPage() {
    return this.#isLastPage;
  }

  search(newKeyword = this.keyword) {
    if (newKeyword !== this.keyword) {
      this.resetNextPageToken();
    }
    return this.fetchYoutubeData(newKeyword).then((data) => this.processVideoData(data));
  }

  resetNextPageToken() {
    this.nextPageToken = '';
    this.#isLastPage = false;
  }

  async fetchYoutubeData(keyword) {
    try {
      const response = await fetch(YOUTUBE_API_ENDPOINT(keyword, this.nextPageToken));
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(ERROR_MESSAGE.NO_MORE_API);
        }
        throw new Error(ERROR_MESSAGE.SERVER_ERROR);
      }
      this.keyword = keyword;
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  processVideoData(result) {
    if (!result.nextPageToken) this.#isLastPage = true;
    this.nextPageToken = result.nextPageToken;
    return parseVideoInfo(result);
  }
}
