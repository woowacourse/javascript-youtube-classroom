import { STANDARD_NUMS } from "./constants.js";
import { API_KEY } from "../apiKey.js";

const BASE_URL = "https://content.googleapis.com/youtube/v3";

const request = async (url, option = {}) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    throw new Error(`http request Error : ${res.status}`);
  }

  return await res.json();
};

export const api = {
  searchVideo: keyword => {
    return request(
      `${BASE_URL}/search?part=snippet&q=${encodeURI(keyword)}&maxResults=${
        STANDARD_NUMS.LOAD_CLIP_COUNT
      }&key=${API_KEY}`,
    );
  },

  searchNextVideo: (keyword, nextPageToken) => {
    return request(
      `${BASE_URL}/search?part=snippet&q=${encodeURI(keyword)}&maxResults=${
        STANDARD_NUMS.LOAD_CLIP_COUNT
      }&pageToken=${nextPageToken}&key=${API_KEY}`,
    );
  },
};
