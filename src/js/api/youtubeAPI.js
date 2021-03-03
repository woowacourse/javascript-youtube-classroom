import { YOUTUBE_API_KEY } from '../../../env.js';

export const api = {
  fetchVideoItems: ({ query, max = 10 }) => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${query}&max_results=${max}&type=video&videoEmbeddable=true&part=snippet`,
      {
        method: 'GET',
      }
    )
      .then(response => response.ok && response.json())
      .catch(error => {
        console.log(error);
      });
  },
};
