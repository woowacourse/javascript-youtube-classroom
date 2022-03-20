import { changeDateFormat } from '../utils/common.js';
import { fetchDataFromKeyword } from '../utils/apiFetch.js';

export class SearchModal {
  #videos;
  #keyword;

  constructor() {
    this.#keyword;
    this.#videos = {};
  }

  setKeyword(keyword) {
    this.keyword = keyword;
  }

  async searchVideos() {
    this.videos = await fetchDataFromKeyword(this.keyword);
  }

  async searchNextPageVideos() {
    this.videos = await fetchDataFromKeyword(this.keyword, this.videos.nextPageToken);
  }

  hasNoVideoItems() {
    return this.videos.items.length === 0;
  }

  videoItemObjects() {
    return this.videos.items.map((video) => {
      return {
        title: video.snippet.title,
        channelName: video.snippet.channelTitle,
        publishedDate: changeDateFormat(video.snippet.publishedAt),
        id: video.id.videoId,
      };
    });
  }
}
