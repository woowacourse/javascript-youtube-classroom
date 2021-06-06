import { VALUES, ERROR_MESSAGES } from '../constants/constants.js';
import { isEmptyObject } from '../utils/utils.js';

export default class YoutubeAPIManager {
  static cache = {};

  constructor() {
    this.searchTerm = '';
    this.pageToken = '';
  }

  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
    this.pageToken = '';
    this.clearCache();
  }

  clearCache() {
    YoutubeAPIManager.cache = {};
  }

  createRequestURL() {
    const requestURL = `https://wonderful-leavitt-5e0985.netlify.app/youtube/search?`;
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

  // TODO: 에러처리를 보다 유연하게 하기
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

    const res = await fetch(url).then((data) => {
      if (!data.ok) {
        if (data.status === 403) {
          throw new Error(ERROR_MESSAGES.EXCEED_API_REQUEST_COUNT(data.status));
        }
        throw new Error(ERROR_MESSAGES.API_REQUEST_ERROR(data.status));
      }
      return data.json();
    });

    YoutubeAPIManager.cache[params] = res;
    this.pageToken = res.nextPageToken;

    return res.items;
  }
  catch(error) {
    console.error(error);
  }
}
