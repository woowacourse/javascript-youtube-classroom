const APIManger = {
  baseURL: 'https://www.googleapis.com/youtube/v3/search?',

  fetchData: async function (inputValue) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}&pageToken=&maxResults=10&type=video&key=AIzaSyALIhA-Z7E0jyNzThoiJzDSItGkc1cuaoE`
      );
      if (!response.ok) {
        throw new Error('입력하신 검색어로 데이터를 가지오지 못했습니다.');
      }
      const json = await response.json();
      return json;
    } catch (e) {
      throw new Error('입력하신 검색어로 데이터를 가지오지 못했습니다.');
    }
  },

  checkResponseError: function (responseData) {
    if (responseData.error) {
      throw new Error('입력하신 검색어로 데이터를 가지오지 못했습니다.');
    }
    return false;
  },

  parsingVideoData: function (responseData) {
    try {
      this.checkResponseError(responseData);
      return responseData.items.map(item => {
        return {
          videoId: item.id.videoId,
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          url: item.snippet.thumbnails.medium.url,
          channelTitle: item.snippet.channelTitle,
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default APIManger;
