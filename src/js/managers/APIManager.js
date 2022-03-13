import { ERROR_MESSAGE, VIDEO_LIST } from '../utils/constants.js';
import { videoData } from '../utils/mockData.js';

const APIManager = {
  baseURL: 'https://vigorous-boyd-74648a.netlify.app/youtube/v3/search',
  pageToken: '',
  part: 'snippet',
  maxResults: VIDEO_LIST.RENDER_SIZE,
  type: 'video',
  regionCode: 'KR',

  async fetchData(inputValue) {
    try {
      // const response = await fetch(
      //   `${this.baseURL}?part=${this.part}&q=${inputValue}&pageToken=${this.pageToken}&maxResults=${this.maxResults}&type=${this.type}&regionCode=${this.regionCode}`
      // );
      // if (!response.ok) {
      //   throw new Error();
      // }
      // const responseData = await response.json();
      return videoData;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.SEARCH_ERROR);
    }
  },

  checkResponseError(responseData) {
    if (responseData.error) {
      throw new Error(ERROR_MESSAGE.CANNOT_LOAD);
    }
    return false;
  },

  parsingVideoData(responseData) {
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

  async getVideoListData(inputValue) {
    try {
      const rawData = await this.fetchData(inputValue);
      return this.parsingVideoData(rawData);
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default APIManager;
