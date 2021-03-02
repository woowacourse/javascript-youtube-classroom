import { YOUTUBE_API_KEY } from '../../../env.js';

class YoutubeModel {
  getVideoBySearch = ({ query, max = 10 }) => {
    const videos = fetch(
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
      .then(myjson => console.log(myjson));
  };
}

export default YoutubeModel;
