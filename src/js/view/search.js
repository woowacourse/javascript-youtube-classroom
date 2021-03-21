
import { SEARCH, SELECTOR, CLASS } from '../constants/constant.js';
import { $, parseDOMFromString, toggleSelectorClass } from '../utils/util.js';
import {
  videoTemplate,
  recentKeywordsTemplate,
} from '../templates/video-template.js';

class SearchView {
  #$searchVideoWrapper;
  #$savedVideoLength;
  #$recentKeywordsSection;
  #$searchNotFound;

  constructor() {
    this.#$searchVideoWrapper = $(SELECTOR.SEARCH_VIDEO_WRAPPER);
    this.#$savedVideoLength = $(SELECTOR.MY_VIDEO_LENGTH);
    this.#$recentKeywordsSection = $(SELECTOR.RECENT_KEYWORDS);
    this.#$searchNotFound = $(SELECTOR.SEARCH_NOT_FOUND);
  }

  renderVideoArticle = (info, save) => {
    const videoArticle = parseDOMFromString(videoTemplate(info, save));
    this.#$searchVideoWrapper.append(videoArticle);
  };

  toggleNotFoundSearchedVideo = length => {
    if (length === 0) {
      toggleSelectorClass(this.#$searchNotFound, CLASS.SHOW, true);
      return;
    }

    toggleSelectorClass(this.#$searchNotFound, CLASS.SHOW, false);
  };

  renderSkeletonArticles = () => {
    this.#$searchVideoWrapper.innerHTML = videoSkeletonTemplate().repeat(

      SEARCH.FETCH_VIDEO_LENGTH
    );
  };

  renderRecentKeywordSection = keywords => {

    this.#$recentKeywordsSection.innerHTML = recentKeywordsTemplate(keywords);
  };

  renderSavedVideoCountSection = length => {
    this.#$savedVideoLength.innerHTML = length;
  };

  resetView = () => {
    this.#$searchVideoWrapper.innerHTML = '';
  };
}

export default SearchView;
