export const fetchDataFromKeyword = async (keyword) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${keyword}&type=video&key=AIzaSyCM0zAxnfk-I2H8Qq4Ynuc1Jf2ZnapM47k`,
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};
