import { $ } from '../utils.js';
import { searchYoutube, searchYoutubeDummyData } from '../api.js';
import { SELECTORS } from '../constants.js';

export default class SearchResultList {
  constructor() {
    this.selector = SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_LIST;
  }

  async getTemplate(response) {}

  render(keyword) {
    this.keyword = keyword;
  }
}
