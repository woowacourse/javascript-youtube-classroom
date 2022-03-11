import { ERROR_MESSAGE } from '../utils/constants';

const APIManager = {
  baseURL: 'https://keen-lamport-feb29e.netlify.app/youtube/v3/search',
  pageToken: '',
  part: 'snippet',
  maxResults: '10',
  type: 'video',
  regionCode: 'KR',

  fetchData: async function (inputValue) {
    try {
      const response = await fetch(
        `${this.baseURL}?part=${this.part}&q=${inputValue}&pageToken=${this.pageToken}&maxResults=${this.maxResults}&type=${this.type}&regionCode=${this.regionCode}`
      );
      if (!response.ok) {
        throw new Error();
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.SEARCH_ERROR);
    }
  },

  checkResponseError: function (responseData) {
    if (responseData.error) {
      throw new Error(ERROR_MESSAGE.CANNOT_LOAD);
    }
    return false;
  },

  parsingVideoData: function (responseData) {
    try {
      this.checkResponseError(responseData);
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
      throw new Error(error);
    }
  },
};

export default APIManager;
