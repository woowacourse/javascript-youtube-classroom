const request = async (url, option) => {
  const response = await fetch(url, option);
  if (response.ok === false) throw new Error('Server Error');
  const data = await response.json();

  return data;
};

export const requestYoutubeSearch = async () => {
  try {
    const response = await request(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=kpop+music&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`,
      {
        method: 'GET',
      },
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
