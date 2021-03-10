import { SEARCH, SELECTOR } from '../constants/constant.js';
import { $, parseDOMFromString } from '../utils/util.js';
import {
  searchVideoTemplate,
  recentKeywordsTemplate,
  myVideoInfosTemplate,
} from '../templates/search-template.js';

class SearchView {
  constructor() {
    this.$searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    this.$myVideoInfosSection = $(SELECTOR.MY_VIDEO_INFOS);
    this.$recentKeywordsSection = $(SELECTOR.RECENT_KEYWORDS);
    this.$searchNotFound = $(SELECTOR.SEARCH_NOT_FOUND);
  }

  renderVideoArticle = (info, save) => {
    this.$searchVideoWrapper.append(
      parseDOMFromString(searchVideoTemplate(info, save))
    );
  };

  toggleNotFound = show => {
    this.$searchNotFound.classList.toggle('hide', !show);
  };

  renderSkeletonArticles = () => {
    this.$searchVideoWrapper.innerHTML = videoSkeletonTemplate().repeat(
      SEARCH.FETCH_VIDEO_LENGTH
    );
  };

  renderRecentKeywordSection = keywords => {
    this.$recentKeywordsSection.innerHTML = recentKeywordsTemplate(keywords);
  };

  renderSavedVideoCountSection = length => {
    this.$myVideoInfosSection.innerHTML = myVideoInfosTemplate(length);
  };

  resetView = () => {
    this.$searchVideoWrapper.innerHTML = '';
    this.toggleNotFound(false);
  };
}

export default SearchView;
