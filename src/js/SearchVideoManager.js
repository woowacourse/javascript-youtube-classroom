import { MAX_DATA_FETCH_AT_ONCE } from './constants';

const DUMMY_YOUTUBE_API_ENDPOINT = (keyword) =>
  `https://brave-lichterman-77e301.netlify.app/dummy/youtube/v3/search?part=snippet&q=${keyword}&maxResults=${MAX_DATA_FETCH_AT_ONCE}`;
const YOUTUBE_API_ENDPOINT = (keyword) =>
  `https://brave-lichterman-77e301.netlify.app/youtube/v3/search?part=snippet&q=${keyword}&maxResults=${MAX_DATA_FETCH_AT_ONCE}`;
const WRONG_API_ENDPOINT = (keyword) =>
  `https://elastic-goldstine-10f16a.netlify.app/search?part=snippettt&q=${keyword}&maxResults=${MAX_DATA_FETCH_AT_ONCE}`;

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
    return fetch(
      this.nextPageToken
        ? `${DUMMY_YOUTUBE_API_ENDPOINT(keyword)}&pageToken=${this.nextPageToken}`
        : DUMMY_YOUTUBE_API_ENDPOINT(keyword)
    ).then((response) => {
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
