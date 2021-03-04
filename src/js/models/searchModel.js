import { API_SEARCH_ENDPOINT, PART_TYPE, SEARCH_TYPE_VIDEO, MAX_RESULT_COUNT, REGION_CODE } from '../constants.js';
import { formatDateKR } from '../utils/formatDate.js';
import { YOUTUBE_API_KEY } from '../env.js';
import { request } from '../utils/request.js';

export default class SearchModel {
  initSearchResult() {
    this.groupIndex = -1;
    this.nextPageToken = '';
  }

  getKeyword() {
    return this.keyword ?? '';
  }

  setKeyword(keyword) {
    this.keyword = keyword;
  }

  getGroupIndex() {
    return this.groupIndex;
  }

  incrementGroupIndex() {
    this.groupIndex += 1;
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

    const queryStringFlattened = Object.keys(options)
      .map((key) => `&${key}=${options[key]}`)
      .join('');

    return `${API_SEARCH_ENDPOINT}?key=${YOUTUBE_API_KEY}`.concat(queryStringFlattened);
  }

  requestSearchResult() {
    return request(this.getSearchApiURI()).then((response) => {
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
