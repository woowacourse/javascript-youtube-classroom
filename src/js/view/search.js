import { SEARCH, SELECTOR } from '../constants/constant.js';
import { $, parseDOMFromString } from '../utils/util.js';
import {
  searchVideoTemplate,
  recentKeywordsTemplate,
  myVideoInfosTemplate,
} from '../templates/search-template.js';

class SearchView {
  renderVideoArticle = (info, save) => {
    const $searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    $searchVideoWrapper.append(
      parseDOMFromString(searchVideoTemplate(info, save))
    );
  };

  toggleNotFound = show => {
    const $searchNotFound = $(SELECTOR.SEARCH_NOT_FOUND);
    if (show) {
      $searchNotFound.classList.remove('hide');
    } else {
      $searchNotFound.classList.add('hide');
    }
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
    this.toggleNotFound(false);
  };
}

export default SearchView;
