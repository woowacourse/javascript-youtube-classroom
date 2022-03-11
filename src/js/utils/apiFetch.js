import { NUM } from "./contants.js";

const BASE_URL = "https://serverless-youtube-api.netlify.app/youtube/v3/";

const getParams = (keyword, pageToken) =>
  new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: NUM.VIDEO_ITEMS_FOR_UNIT,
    regionCode: "kr",
    q: keyword,
    pageToken: pageToken || "",
  }).toString();

export const fetchDataFromKeyword = async (keyword, pageToken = "") => {
  try {
    const res = await fetch(`${BASE_URL}search?${getParams(keyword, pageToken)}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`에러코드: ${res.status}, ${data.error.message}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
