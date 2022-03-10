export const fetchDataFromKeyword = async (keyword) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${keyword}&type=video&key=${key5}`,
    );
    const data = res.json();
    if (!res.ok) {
      throw new Error(`에러코드:${res.status}`);
    }
    return data;
  } catch (e) {
    return;
  }
};

export const getNextPageData = async (keyword, pageToken) => {
  try {
    const res =
      await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${keyword}&type=video&key=
      ${key5}&pageToken=${pageToken}
      `);
    const data = res.json();
    if (!res.ok) {
      throw new Error(`에러코드:${res.status}`);
    }
    return data;
  } catch (e) {
    return;
  }
};
