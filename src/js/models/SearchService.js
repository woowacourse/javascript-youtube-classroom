import {
  API_SEARCH_ENDPOINT,
  PART_TYPE,
  SEARCH_TYPE_VIDEO,
  MAX_RESULT_COUNT,
  REGION_CODE,
  MAX_RECENT_KEYWORD_COUNT,
  KEY_VIDEOS_WATCHING,
  KEY_VIDEOS_WATCHED,
  KEY_RECENT_KEYWORDS,
} from '../constants.js';
import { formatDateKR } from '../utils/formatDate.js';
import { httpRequest } from '../utils/httpRequest.js';
import SearchModel from './SearchModel.js';

export default class SearchService {
  constructor() {
    this.model = new SearchModel();
    this.init();
  }

  init(keyword = '') {
    this.nextPageToken = '';
    this.totalSearchResult = [];
    this.keyword = keyword;
    this.saveKeyword();
  }

  async getSearchResultAsync() {
    const response = await httpRequest(this.getSearchApiURI(), 'GET');
    const searchResult = this.processJSON(response);

    this.addNewSearchResult(searchResult);

    return searchResult;
  }

  getSavedVideoCount() {
    return this.model.getListByKey(KEY_VIDEOS_WATCHING).length + this.model.getListByKey(KEY_VIDEOS_WATCHED);
  }

  saveVideo(targetId) {
    const targetVideo = this.totalSearchResult.find((video) => video.videoId === targetId);

    targetVideo.isSaved = true;
    this.model.insertItemByKey(KEY_VIDEOS_WATCHING, targetVideo);
  }

  getRecentKeywords() {
    try {
      return this.model.getListByKey(KEY_RECENT_KEYWORDS);
    } catch (e) {
      return '';
    }
  }

  saveKeyword() {
    if (this.keyword === '') {
      return;
    }

    const recentKeywords = this.model.getListByKey(KEY_RECENT_KEYWORDS);

    if (recentKeywords.includes(this.keyword)) {
      return;
    }
    if (recentKeywords.length === MAX_RECENT_KEYWORD_COUNT) {
      this.model.deleteLastItemByKey(KEY_RECENT_KEYWORDS);
    }
    this.model.insertItemAtFirstByKey(KEY_RECENT_KEYWORDS, this.keyword);
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

  processJSON(rawData) {
    this.nextPageToken = rawData.nextPageToken;

    return rawData.items.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: formatDateKR(item.snippet.publishedAt),
      isSaved: this.isSavedVideo(item.id.videoId),
    }));
  }

  isSavedVideo(targetId) {
    const videosWatching = this.model.getListByKey(KEY_VIDEOS_WATCHING);
    const videosWatched = this.model.getListByKey(KEY_VIDEOS_WATCHED);

    return (
      videosWatching.some((video) => video.videoId === targetId) ||
      videosWatched.some((video) => video.videoId === targetId)
    );
  }

  addNewSearchResult(newSearchResult) {
    this.totalSearchResult.push(...newSearchResult);
  }
}
