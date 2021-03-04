import { api } from '../api/youtubeAPI.js';
import { dummyData } from '../../../dummy-data.js';

class YoutubeModel {
  #videoInfos;

  constructor() {
    this.#videoInfos = [];
  }

  getVideoInfosBySearch = async ({ query, max = 2 }) => {
    await api.fetchVideoItems({ query, max }).then(json => {
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
