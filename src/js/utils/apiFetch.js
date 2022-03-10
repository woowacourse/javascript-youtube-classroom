import { key1 } from "./@@@key.js";
import { NUM } from "./contants.js";

export const fetchDataFromKeyword = async (keyword) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${NUM.VIDEO_ITEMS_FOR_UNIT}&q=${keyword}&type=video&key=${key1}`,
    );
    const data = res.json();
    if (!res.ok) {
      throw new Error(`에러코드: ${res.status}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getNextPageData = async (keyword, pageToken) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${NUM.VIDEO_ITEMS_FOR_UNIT}&q=${keyword}&type=video&key=${key1}&pageToken=${pageToken}`,
    );
    const data = res.json();
    if (!res.ok) {
      throw new Error(`에러코드: ${res.status}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
