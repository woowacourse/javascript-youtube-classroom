import { $, parseDOMFromString } from '../utils/util.js';
import {
  searchNotFoundTemplate,
  searchVideoTemplate,
  recentKeywordsTemplate,
  myVideoInfosTemplate,
} from './template.js';

class SearchView {
  init = () => {
    this.renderSavedVideoCountSection(0);
  };

  renderVideoArticle = (info, save) => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.append(
      parseDOMFromString(searchVideoTemplate(info, save))
    );
  };

  renderNotFound = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = searchNotFoundTemplate();
  };

  renderSkeletonArticles = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = videoSkeletonTemplate().repeat(10);
  };

  renderRecentKeywordSection = keywords => {
    const $recentKeywordsSection = $('#recent-keywords');
    $recentKeywordsSection.innerHTML = recentKeywordsTemplate(keywords);
  };

  renderSavedVideoCountSection = length => {
    const $myVideoInfosSection = $('#my-video-infos');
    console.log($myVideoInfosSection);
    $myVideoInfosSection.innerHTML = myVideoInfosTemplate(length);
  };

  resetView = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = '';
  };
}

export default SearchView;
