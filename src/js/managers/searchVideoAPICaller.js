import { ERROR_MESSAGE, VIDEO_LIST } from '../utils/constants.js';
import APIUtil from './APIUtil.js';

const searchVideoAPICaller = {
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
      const requestURL = APIUtil.createQueryString(this.endPoint, this.queryItems);
      const rawData = await APIUtil.fetchData(requestURL);
      return this.parsingVideoData(rawData);
    } catch (error) {
      throw error;
    }
  },

  parsingVideoData(rawData) {
    try {
      const isLastPage = this.checkLastPage(rawData);
      return rawData.items.map(item => ({
        videoId: item.id.videoId,
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        url: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        isLastPage,
      }));
    } catch (error) {
      throw new Error(ERROR_MESSAGE.DATA_PROCESSING_ERROR);
    }
  },

  checkLastPage(responseData) {
    this.queryItems.pageToken = responseData.nextPageToken || '';
    return !responseData.nextPageToken;
  },
};

export default searchVideoAPICaller;
