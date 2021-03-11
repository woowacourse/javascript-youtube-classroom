import { SEARCH, SELECTOR } from '../constants/constant.js';
import { $, parseDOMFromString, toggleSelectorClass } from '../utils/util.js';
import {
  searchVideoTemplate,
  recentKeywordsTemplate,
} from '../templates/search-template.js';

class SearchView {
  constructor() {
    this.$searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    this.$myVideoLength = $(SELECTOR.MY_VIDEO_LENGTH);
    this.$recentKeywordsSection = $(SELECTOR.RECENT_KEYWORDS);
    this.$searchNotFound = $(SELECTOR.SEARCH_NOT_FOUND);
  }

  renderVideoArticle = (info, save) => {
    this.$searchVideoWrapper.append(
      parseDOMFromString(searchVideoTemplate(info, save))
    );
  };

  toggleNotFoundSearchedVideo = length => {
    if (length === 0) {
      toggleSelectorClass(this.$searchNotFound, 'show', true);
      return;
    }

    toggleSelectorClassfalse(this.$searchNotFound, 'show', false);
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
    this.$myVideoLength.innerHTML = length;
  };

  resetView = () => {
    this.$searchVideoWrapper.innerHTML = '';
  };
}

export default SearchView;
