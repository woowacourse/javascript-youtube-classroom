import { api } from '../api/youtubeAPI.js';
import { SEARCH } from '../constants/constant.js';

class YoutubeModel {
  #searchedVideos;
  #nextPageToken;
  #videoInfos;

  constructor() {
    this.#searchedVideos = [];
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
    console.log(json);

    this.#nextPageToken = json.nextPageToken;
    this.#searchedVideos = this.getVideoInfos(json.items);
    return this.#searchedVideos;
  };

  resetNextPageToken() {
    this.#nextPageToken = '';
  }

  get searchedVideos() {
    return this.#searchedVideos;
  }

  get searchedCount() {
    return this.#searchedVideos.length;
  }
}

export default YoutubeModel;
