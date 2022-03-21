import { ERROR_MESSAGE, VIDEO_LIST } from '../utils/constants.js';
import validator from '../utils/validator.js';
import ApiUtil from './ApiUtil.js';

const videoApiCaller = {
  endPoint: 'https://vigorous-boyd-74648a.netlify.app/youtube/v3/',

  implementations: {
    search: 'search',
    videos: 'videos',
  },

  searchQueryItems: {
    part: 'snippet',
    q: '',
    pageToken: '',
    maxResults: VIDEO_LIST.RENDER_SIZE,
    type: 'video',
    regionCode: 'KR',
  },

  storeVideoQueryItems: {
    part: 'snippet',
    type: 'video',
    regionCode: 'KR',
    id: '',
  },

  async getSearchVideoListData(inputValue) {
    try {
      this.searchQueryItems.q = inputValue;
      validator.checkParamsEmpty(this.searchQueryItems);
      const requestURL = ApiUtil.createQueryString(
        this.endPoint + this.implementations.search,
        this.searchQueryItems
      );
      const rawData = await ApiUtil.fetchData(requestURL);
      return this.parsingSearchVideoData(rawData);
    } catch (error) {
      throw error;
    }
  },

  async getStoreVideoListData(videoIdList) {
    try {
      this.storeVideoQueryItems.id = videoIdList.join(',');
      validator.checkParamsEmpty(this.storeVideoQueryItems);
      const requestURL = ApiUtil.createQueryString(
        this.endPoint + this.implementations.videos,
        this.storeVideoQueryItems
      );
      const rawData = await ApiUtil.fetchData(requestURL);
      return this.parsingStoreVideoData(rawData);
    } catch (error) {
      throw error;
    }
  },

  parsingSearchVideoData(rawData) {
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
    this.searchQueryItems.pageToken = responseData.nextPageToken || '';
    return !responseData.nextPageToken;
  },

  parsingStoreVideoData(rawData) {
    try {
      return rawData.items.map(item => ({
        videoId: item.id,
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

export default videoApiCaller;
