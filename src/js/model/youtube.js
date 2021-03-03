import { api } from '../api/youtubeAPI.js';

class YoutubeModel {
  #videoInfos;

  constructor() {
    this.#videoInfos = [];
  }

  getVideoInfosBySearch = async ({ query, max = 10 }) => {
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
  };

  get videoInfos() {
    return this.#videoInfos;
  }
}

export default YoutubeModel;
