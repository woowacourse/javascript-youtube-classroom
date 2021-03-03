import { api } from '../api/youtubeAPI.js';

class YoutubeModel {
  constructor() {
    this.videoInfos = [];
  }

  getVideoIdBySearch = async ({ query, max = 10 }) => {
    await api.fetchVideoItems({ query, max }).then(json => {
      this.videoInfos = json.items.map(item => {
        console.log(item.snippet);
        return {
          url: item.id.videoId,
          title: item.snippet.title,
          channelUrl: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishTime: item.snippet.publishTime,
        };
      });
    });
    console.log(this.videoInfos);
  };
}

export default YoutubeModel;
