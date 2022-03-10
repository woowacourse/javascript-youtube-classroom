import key from '../utils/APIkey.js';

const APIManager = {
  baseURL: 'https://www.googleapis.com/youtube/v3/search?',
  pageToken: '',

  fetchData: async function (inputValue) {
    try {
      const response = await fetch(
        `${this.baseURL}part=snippet&q=${inputValue}&pageToken=${this.pageToken}&maxResults=10&type=video&key=${key}`
      );
      if (!response.ok) {
        throw new Error('400, 500');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error('검색 결과가 없는 경우');
    }
  },

  checkResponseError: function (responseData) {
    if (responseData.error) {
      throw new Error('에러 3');
    }
    return false;
  },

  parsingVideoData: function (responseData) {
    try {
      this.checkResponseError(responseData);
      console.log(responseData);
      this.pageToken = responseData.nextPageToken;
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

export default APIManager;
