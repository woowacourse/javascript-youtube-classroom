import APIUtil from './APIUtil.js';
import { ERROR_MESSAGE } from '../utils/constants.js';

const storeVideoAPICaller = {
  endPoint: 'https://vigorous-boyd-74648a.netlify.app/youtube/v3/videos',
  queryItems: {
    part: 'snippet',
    type: 'video',
    regionCode: 'KR',
    id: '',
  },

  async getVideoListData(videoIdList) {
    try {
      this.queryItems.id = videoIdList.join(',');
      console.log(this.queryItems.id);
      const requestURL = APIUtil.createQueryString(this.endPoint, this.queryItems);
      console.log(requestURL);
      const rawData = await APIUtil.fetchData(requestURL);
      return this.parsingVideoData(rawData);
    } catch (error) {
      throw error;
    }
  },

  parsingVideoData(rawData) {
    try {
      return rawData.items.map(item => ({
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

export default storeVideoAPICaller;
