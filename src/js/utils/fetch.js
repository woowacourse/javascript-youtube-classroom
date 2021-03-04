import { API_KEY } from './env.js';
import { YOUTUBE } from './constant.js';

const BASE_URL = `https://www.googleapis.com/youtube/v3/search?&part=snippet`;

export const request = async (keyword, pageToken = '') => {
  const URL = `&maxResults=${YOUTUBE.NUMBER_TO_LOAD}&q=${keyword}&key=${API_KEY}${pageToken}`;
  try {
    const response = await fetch(`${BASE_URL}${URL}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    alert(`💣 Error : ${err} 💣`);
  }
};
