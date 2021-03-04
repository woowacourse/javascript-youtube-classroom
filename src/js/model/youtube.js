import { api } from '../api/youtubeAPI.js';
import { dummyData } from '../../../dummy-data.js';
class YoutubeModel {
  #videoInfos;
  #nextPageToken;

  constructor() {
    this.#videoInfos = [];
    this.#nextPageToken = '';
  }

  getVideoInfosBySearch = async ({ query, max = 10 }) => {
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
        };
      });
    });
    // this.#videoInfos = dummyData;
  };

  get videoInfos() {
    return this.#videoInfos;
  }
}

export default YoutubeModel;
