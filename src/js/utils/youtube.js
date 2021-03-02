import { MY_KEY } from '../key.js';

export const getVideos = async (terms) => {
  const url = `https://www.googleapis.com/youtube/v3/search?`
    + `part=snippet&key=${MY_KEY}&q=${terms}&maxResults=${10}&type=video&videoEmbeddable=true`;

  const res = await fetch(url, { method: "GET" }).then(data => {
    if (!data.ok) {
      throw new Error(data.status);
    }
    return data;
  });
  return res;
}