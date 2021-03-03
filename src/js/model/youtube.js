import { YOUTUBE_API_KEY } from '../../../env.js';

class YoutubeModel {
  constructor() {
    this.videoIds = [];
  }

  getVideoBySearch = ({ query, max = 10 }) => {
    const videoItems = fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${query}&max_results=${max}&type=video&videoEmbeddable=true`,
      {
        method: 'GET',
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        console.log(json.items);
        this.getVideoById(json.items);
      });

    return videoItems;
  };

  getVideoById = items => {
    this.videoIds = items.map(item => {
      return item.id.videoId;
    });
  };
}

export default YoutubeModel;
