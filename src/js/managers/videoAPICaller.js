import { ERROR_MESSAGE, VIDEO_LIST } from '../utils/constants.js';
import APIManager from './APIManager.js';

const videoAPICaller = {
  endPoint: 'https://vigorous-boyd-74648a.netlify.app/youtube/v3/search',
  queryItems: {
    part: 'snippet',
    q: '',
    pageToken: '',
    maxResults: VIDEO_LIST.RENDER_SIZE,
    type: 'video',
    regionCode: 'KR',
  },

  async getVideoListData(inputValue) {
    try {
      this.queryItems.q = inputValue;
      const requestURL = APIManager.createQueryString(this.endPoint, this.queryItems);
      const rawData = await APIManager.fetchData(requestURL);
      return this.parsingVideoData(rawData);
    } catch (error) {
      throw error;
    }
  },

  parsingVideoData(responseData) {
    try {
      this.queryItems.pageToken = responseData.nextPageToken;
      return responseData.items.map(item => ({
        videoId: item.id.videoId,
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        url: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
      }));
    } catch (error) {
      throw new Error(ERROR_MESSAGE.DATA_PROCESSING_ERROR);
    }
  },
};

export default videoAPICaller;
