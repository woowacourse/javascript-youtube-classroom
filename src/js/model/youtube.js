import { api } from '../api/youtubeAPI.js';
import { SEARCH } from '../constants/constant.js';

class YoutubeModel {
  #videoInfos;
  #nextPageToken;

  constructor() {
    this.#videoInfos = [];
    this.#nextPageToken = '';
  }

  getVideoInfosBySearch = async ({
    query,
    max = SEARCH.FETCH_VIDEO_LENGTH,
  }) => {
    const nextPageToken = this.#nextPageToken;

    await api.fetchVideoItems({ query, nextPageToken, max }).then(json => {
      this.#nextPageToken = json.nextPageToken;
      this.#videoInfos = json.items.map(item => {
        return {
          url: item.id.videoId,
          title: item.snippet.title,
          channelUrl: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishTime: item.snippet.publishTime,
          watched: false,
        };
      });
    });
  };

  resetNextPageToken() {
    this.#nextPageToken = '';
  }

  get videoInfos() {
    return this.#videoInfos;
  }
}

export default YoutubeModel;
