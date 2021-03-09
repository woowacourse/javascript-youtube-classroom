import { API_SEARCH_ENDPOINT, PART_TYPE, SEARCH_TYPE_VIDEO, MAX_RESULT_COUNT, REGION_CODE } from '../constants.js';
import { formatDateKR } from '../utils/formatDate.js';
import { httpRequest } from '../utils/httpRequest.js';
import { isSavedVideo } from '../controllers/elementValidator.js';

export default class SearchService {
  constructor(model) {
    this.model = model;
  }

  async getSearchResultAsync() {
    const response = await httpRequest(this.getSearchApiURI(), 'GET');
    const searchResult = this.processJSON(response);

    this.model.addNewSearchResult(searchResult);

    return searchResult;
  }

  getSearchApiURI() {
    const options = {
      part: PART_TYPE,
      q: this.model.keyword,
      type: SEARCH_TYPE_VIDEO,
      maxResults: MAX_RESULT_COUNT,
      regionCode: REGION_CODE,
      pageToken: this.model.nextPageToken,
    };

    const queryStringFlattened = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${API_SEARCH_ENDPOINT}?${queryStringFlattened}`;
  }

  processJSON(rawData) {
    this.model.setNextPageToken(rawData.nextPageToken);

    return rawData.items.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: formatDateKR(item.snippet.publishedAt),
      isSaved: isSavedVideo(item.id.videoId),
    }));
  }
}
