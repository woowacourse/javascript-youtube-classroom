import { API_SEARCH_ENDPOINT, PART_TYPE, SEARCH_TYPE_VIDEO, MAX_RESULT_COUNT, REGION_CODE } from '../constants.js';
import { formatDateKR } from '../utils/formatDate.js';
import { request } from '../utils/request.js';

export default class SearchModel {
  initSearchResult() {
    this.nextPageToken = '';
  }

  getKeyword() {
    return this.keyword ?? '';
  }

  setKeyword(keyword) {
    this.keyword = keyword;
  }

  getSearchApiURI() {
    const options = {
      part: PART_TYPE,
      q: this.keyword,
      type: SEARCH_TYPE_VIDEO,
      maxResults: MAX_RESULT_COUNT,
      regionCode: REGION_CODE,
      pageToken: this.nextPageToken,
    };

    const queryStringFlattened = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${API_SEARCH_ENDPOINT}?${queryStringFlattened}`;
  }

  requestSearchResult() {
    return request(this.getSearchApiURI(), 'GET').then((response) => {
      this.setSearchResult(response);
    });
  }

  processJSON(rawData) {
    this.nextPageToken = rawData.nextPageToken;

    return rawData.items.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: formatDateKR(item.snippet.publishedAt),
    }));
  }

  setSearchResult(result) {
    this.searchResult = this.processJSON(result);
  }

  getSearchResult() {
    return this.searchResult;
  }

  setVideoData(target, videoData) {
    target.dataset.videoId = videoData.videoId;
    target.dataset.videoTitle = videoData.videoTitle;
    target.dataset.channelId = videoData.channelId;
    target.dataset.channelTitle = videoData.channelTitle;
    target.dataset.publishedAt = videoData.publishedAt;
  }

  getVideoData(target) {
    return {
      videoId: target.dataset.videoId,
      videoTitle: target.dataset.videoTitle,
      channelId: target.dataset.channelId,
      channelTitle: target.dataset.channelTitle,
      publishedAt: target.dataset.publishedAt,
    };
  }
}
