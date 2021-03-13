import { VALUES, ERROR_MESSAGES } from '../constants/constants.js';
import { isEmptyObject } from '../utils/utils.js';

const youtubeFetchCacheCleaner = setInterval(() => {
  YoutubeAPIManager.cache = {};
}, 3000000);

export default class YoutubeAPIManager {
  static cache = {};

  constructor() {
    this.domain = 'wonderful-leavitt-5e0985.netlify.app';
    this.searchTerm = '';
    this.pageToken = '';
  }

  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
    this.pageToken = '';
  }

  createRequestURL() {
    const requestURL = `https://${this.domain}/youtube/search?`;
    const searchParams = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      q: this.searchTerm,
      maxResults: VALUES.MAXIMUM_SEARCH_VIDEO_COUNT,
    });

    if (this.pageToken) {
      searchParams.set('pageToken', this.pageToken);
    }

    return `${requestURL}${searchParams}`;
  }

  async requestVideos() {
    const url = this.createRequestURL(this.searchTerm, this.pageToken);
    const params = url.split('?')[1];
    if (
      YoutubeAPIManager.cache[params] &&
      !isEmptyObject(YoutubeAPIManager.cache[params])
    ) {
      this.pageToken = YoutubeAPIManager.cache[params].nextPageToken;
      return YoutubeAPIManager.cache[params].items;
    }

    try {
      const data = await fetch(url);
      if (!data.ok) {
        if (data.status === 403) {
          throw new Error(ERROR_MESSAGES.EXCEED_API_REQUEST_COUNT(data.status));
        }
        throw new Error(ERROR_MESSAGES.API_REQUEST_ERROR(data.status));
      }

      const dataJSON = await data.json();
      YoutubeAPIManager.cache[params] = dataJSON;
      this.pageToken = dataJSON.nextPageToken;

      return dataJSON.items;
    } catch (error) {
      alert(error);
    }
  }
}
