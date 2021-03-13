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
      this.#videoInfos = json.map(item => {
        return {
          url: item.url,
          title: item.title,
          channelUrl: item.channelUrl,
          channelTitle: item.channelTitle,
          publishTime: item.publishTime,
        };
      });
    });
  };

  get videoInfos() {
    return this.#videoInfos;
  }
}

export default YoutubeModel;
