import { MY_KEY } from '../key.js';
import { MAX_RESULT } from '../constants/constants.js';

export default class YoutubeAPIManager {
  constructor() {
    this.searchTerm = '';
    this.pageToken = '';
  }

  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
    this.pageToken = '';
  }

  createRequestUrl() {
    const pageTokenQuery = this.pageToken ? `pageToken=${this.pageToken}` : '';

    return (
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&key=${MY_KEY}
      &q=${this.searchTerm}&maxResults=${MAX_RESULT}&type=video&${pageTokenQuery}`
    );
  }

  async requestVideos() {
    const url = this.createRequestUrl(this.searchTerm, this.pageToken);

    const res = await fetch(url, { method: 'GET' }).then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    });

    this.pageToken = res.nextPageToken;

    return res.items;
  }
}
