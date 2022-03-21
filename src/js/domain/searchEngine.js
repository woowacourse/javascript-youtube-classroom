import fetch from 'node-fetch';
import { preprocessDate } from '../util/common.js';
import { VIDEO_COUNT } from '../util/constants.js';

export default class SearchEngine {
  #pageToken = '';

  get pageToken() {
    return this.#pageToken;
  }

  set pageToken(pageToken) {
    this.#pageToken = pageToken;
  }

  resetPageToken() {
    this.#pageToken = '';
  }

  async searchKeyword(keyword) {
    const YOUTUBE_API_URL = this.#getYoutubeApiUrl(keyword);
    const response = await fetch(YOUTUBE_API_URL);

    if (response.ok) {
      const json = await response.json();

      if (this.#isDataExist(json)) {
        this.#pageToken = json.nextPageToken ?? null;
        return json.items;
      }

      this.#pageToken = null;
      return null;
    }

    throw Error(response.status);
  }

  #isDataExist(data) {
    return data.items.length && Object.keys(data.items[0]).includes('snippet');
  }

  #getYoutubeApiUrl(keyword) {
    let YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet&maxResults=${VIDEO_COUNT}`;

    if (this.#pageToken) {
      YOUTUBE_API_URL += `&pageToken=${this.#pageToken}`;
    }

    return YOUTUBE_API_URL;
  }

  preprocessData(data) {
    const preprocessedData = data.map((datum) => {
      const thumbnails = datum.snippet.thumbnails.medium.url;
      const { title, channelTitle, publishTime } = datum.snippet;
      const { videoId } = datum.id;

      return {
        thumbnails,
        title,
        channelTitle,
        publishTime: preprocessDate(publishTime),
        videoId,
      };
    });

    return preprocessedData;
  }
}
