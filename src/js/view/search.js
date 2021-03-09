import { SEARCH, SELECTOR } from '../constants/constant.js';
import { $, parseDOMFromString } from '../utils/util.js';
import {
  searchNotFoundTemplate,
  searchVideoTemplate,
  recentKeywordsTemplate,
  myVideoInfosTemplate,
} from '../templates/search-template.js';

class SearchView {
  init = () => {
    this.renderSavedVideoCountSection(0);
    this.renderRecentKeywordSection([]);
  };

  renderVideoArticle = (info, save) => {
    const $searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    $searchVideoWrapper.append(
      parseDOMFromString(searchVideoTemplate(info, save))
    );
  };

  renderNotFound = () => {
    const $searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    $searchVideoWrapper.innerHTML = searchNotFoundTemplate();
  };

  renderSkeletonArticles = () => {
    const $searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    $searchVideoWrapper.innerHTML = videoSkeletonTemplate().repeat(
      SEARCH.FETCH_VIDEO_LENGTH
    );
  };

  renderRecentKeywordSection = keywords => {
    const $recentKeywordsSection = $(SELECTOR.RECENT_KEYWORDS);
    $recentKeywordsSection.innerHTML = recentKeywordsTemplate(keywords);
  };

  renderSavedVideoCountSection = length => {
    const $myVideoInfosSection = $(SELECTOR.MY_VIDEO_INFOS);
    $myVideoInfosSection.innerHTML = myVideoInfosTemplate(length);
  };

  resetView = () => {
    const $searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    $searchVideoWrapper.innerHTML = '';
  };
}

export default SearchView;
