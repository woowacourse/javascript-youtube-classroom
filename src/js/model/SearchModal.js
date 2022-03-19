import { changeDateFormat } from '../utils/common.js';

export class SearchModal {
  constructor() {
    this.keyword;
    this.videos = {};
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
