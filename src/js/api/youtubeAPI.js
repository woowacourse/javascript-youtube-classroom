import { YOUTUBE_API_KEY } from '../../../env.js';

export const api = {
  fetchVideoItems: ({ query, max = 10 }) => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${query}&max_results=${max}&type=video&videoEmbeddable=true`,
      {
        method: 'GET',
      }
    ).then(res => {
      return res.ok && res.json();
    });
  },
};
