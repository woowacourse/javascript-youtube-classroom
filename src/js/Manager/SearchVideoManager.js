import fetch from 'node-fetch';
import { YOUTUBE_API_ENDPOINT } from '../youtubeApi';

export default class SearchVideoManager {
  #isLastPage;

  constructor() {
    this.keyword = '';
    this.nextPageToken = '';
    this.#isLastPage = false;
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

  fetchYoutubeData(keyword) {
    return fetch(YOUTUBE_API_ENDPOINT(keyword, this.nextPageToken)).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      this.keyword = keyword;
      return response.json();
    });
  }

  processVideoData(result) {
    if (!result.nextPageToken) this.#isLastPage = true;
    this.nextPageToken = result.nextPageToken;
    return result.items.map((item) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      publishedDate: new Date(item.snippet.publishedAt),
    }));
  }
}
