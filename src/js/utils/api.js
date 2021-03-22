import { STANDARD_NUMS } from "./constants.js";

const BASE_URL = "https://shinsehantan-youtube.netlify.app/youtube/";

const getParams = ({ part, q, maxResults, pageToken }) =>
  new URLSearchParams({ part, q, maxResults, pageToken }).toString();

const request = async (url, option = {}) => {
  try {
    const res = await fetch(url, option);
    const body = await res.json();

    if (!res.ok) {
      throw new Error(`http request Error : ${res.status}${body.error.message}`);
    }

    return body;
  } catch (error) {
    console.error(error);
  }
};

const API = {
  searchVideo: async (keyword, nextPageToken = "") => {
    return await request(
      `${BASE_URL}/search?${getParams({
        part: "snippet",
        q: keyword,
        maxResults: STANDARD_NUMS.LOAD_CLIP_COUNT,
        pageToken: nextPageToken,
      })}`,
    );
  },
};

export default API;
