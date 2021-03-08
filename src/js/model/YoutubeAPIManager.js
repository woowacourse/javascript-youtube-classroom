import { MY_KEY } from '../key.js';
import { MAX_RESULT, ERROR_MESSAGE } from '../constants/constants.js';

export default class YoutubeAPIManager {
  constructor() {
    this.searchTerm = '';
    this.pageToken = '';
  }

  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
    this.pageToken = '';
  }

  createRequestURL() {
    const requestURL = `https://www.googleapis.com/youtube/v3/search?`;
    const searchParams = new URLSearchParams('part=snippet&type=video');

    searchParams.set('q', this.searchTerm);
    searchParams.set('key', MY_KEY);
    searchParams.set('maxResults', MAX_RESULT);

    if (this.pageToken) {
      searchParams.set('pageToken', this.pageToken);
    }

    return `${requestURL}${searchParams}`;
  }

  async requestVideos() {
    const url = this.createRequestURL(this.searchTerm, this.pageToken);
    const res = await fetch(url).then((data) => {
      if (!data.ok) {
        if (data.status === 403) {
          throw new Error(ERROR_MESSAGE.EXCEED_API_REQUEST_COUNT(data.status));
        }
        throw new Error(ERROR_MESSAGE.API_REQUEST_ERROR(data.status));
      }
      return data.json();
    });

    this.pageToken = res.nextPageToken;

    return res.items;
  }
}
