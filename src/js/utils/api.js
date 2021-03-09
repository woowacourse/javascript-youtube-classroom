import { STANDARD_NUMS } from "./constants.js";
import { API_KEY } from "../apiKey.js";

const BASE_URL = "https://content.googleapis.com/youtube/v3";

const getParams = ({ part, q, maxResults, key, pageToken }) =>
  new URLSearchParams({ part, q, maxResults, key, pageToken }).toString();

const request = async (url, option = {}) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    throw new Error(`http request Error : ${res.status}`);
  }

  return await res.json();
};

export const api = {
  searchVideo: (keyword, nextPageToken = "") => {
    return request(
      `${BASE_URL}/search?${getParams({
        part: "snippet",
        q: keyword,
        maxResults: STANDARD_NUMS.LOAD_CLIP_COUNT,
        key: API_KEY,
        pageToken: nextPageToken,
      })}`,
    );
  },
};
