import { api } from '../api/youtubeAPI.js';

class YoutubeModel {
  constructor() {
    this.videoIds = [];
  }

  getVideoIdBySearch = ({ query, max = 10 }) => {
    api.fetchVideoItems({ query, max }).then(json => {
      this.videoIds = json.items.map(item => {
        return item.id.videoId;
      });
    });
  };
}

export default YoutubeModel;
