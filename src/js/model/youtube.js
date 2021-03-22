import { api } from '../api/youtubeAPI.js';
import { SEARCH } from '../constants/constant.js';

class YoutubeModel {
  #videoInfos;
  #nextPageToken;

  constructor() {
    this.#videoInfos = [];

    this.#nextPageToken = '';
  }

  getVideoInfos(items) {
    return items.map(item => {
      return {
        url: item.id.videoId,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
      };
    });
  }

  getVideoInfosBySearch = async ({
    query,
    max = SEARCH.FETCH_VIDEO_LENGTH,
  }) => {
    const nextPageToken = this.#nextPageToken;
    const json = await api.fetchVideoItems({ query, nextPageToken, max });
    this.#nextPageToken = json.nextPageToken;
    this.#videoInfos = this.getVideoInfos(json.items);

  };

  resetNextPageToken() {
    this.#nextPageToken = '';
  }

  get videoInfos() {
    return this.#videoInfos;
  }

  get videoCount() {
    return this.#videoInfos.length;

  }
}

export default YoutubeModel;
