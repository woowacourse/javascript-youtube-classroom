export const fetchDataFromKeyword = async (keyword) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${keyword}&type=video&key=AIzaSyCM0zAxnfk-I2H8Qq4Ynuc1Jf2ZnapM47k`,
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
