import { key1, key2, key3 } from '../../const/consts.js';

export const fetchDataFromKeyword = async (keyword) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keyword}&type=video&key=${key3}`,
    );
    const data = res.json();
    if (!res.ok) {
      throw new Error(`에러코드:${res.status}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getNextPageData = async (keyword, pageToken) => {
  try {
    const res =
      await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${keyword}&type=video&key=
      ${key3}&pageToken=${pageToken}
      `);
    const data = res.json();
    if (!res.ok) {
      throw new Error(`에러코드:${res.status}`);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
