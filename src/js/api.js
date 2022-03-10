const request = async (url, option) => {
  const response = await fetch(url, option);
  if (response.ok === false) throw new Error('Server Error');
  const data = await response.json();

  return data;
};

const dummy = 'https://youtube-dummy-hope.herokuapp.com/youtubeDummy/first';
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=kpop+music&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;

export const requestYoutubeSearch = async (keyword = '', nextPageToken = '') => {
  try {
    const response = await request(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword}&maxResults=10&key=${process.env.YOUTUBE_API_KEY}&pageToken=${nextPageToken}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
