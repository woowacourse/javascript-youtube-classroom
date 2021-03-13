import { isSavedVideo } from '../controllers/elementValidator.js';
import { httpRequest } from '../utils/httpRequest.js';
import { formatDateKR } from '../utils/formatDate.js';
import { escape } from '../utils/escapeSpecialCharacter.js';
import { YOUTUBE_API } from '../constants.js';

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
      part: YOUTUBE_API.PART_TYPE,
      q: this.model.keyword,
      type: YOUTUBE_API.SEARCH_TYPE_VIDEO,
      maxResults: YOUTUBE_API.MAX_RESULT_COUNT,
      regionCode: YOUTUBE_API.REGION_CODE,
      pageToken: this.model.nextPageToken,
    };

    const queryStringFlattened = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${YOUTUBE_API.SEARCH_ENDPOINT}?${queryStringFlattened}`;
  }

  processJSON(rawData) {
    this.model.setNextPageToken(rawData.nextPageToken);

    return rawData.items.map((item) => ({
      videoId: item.id.videoId,
      videoTitle: escape(item.snippet.title),
      channelId: item.snippet.channelId,
      channelTitle: escape(item.snippet.channelTitle),
      publishedAt: formatDateKR(item.snippet.publishedAt),
      isSaved: isSavedVideo(item.id.videoId),
    }));
  }
}
