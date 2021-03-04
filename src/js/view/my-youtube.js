import { $ } from '../utils/util.js';
import {
  searchNotFoundTemplate,
  searchVideoTemplate,
  recentKeywordsTemplate,
  myVideoInfosTemplate,
} from './template.js';
class MyYoutubeView {
  renderVideoArticle = (info, save) => {
    const $searchVideoWrapper = $('#search-video-wrapper');

    // TODO : util화 하기
    const parser = new DOMParser();
    $searchVideoWrapper.append(
      parser.parseFromString(searchVideoTemplate(info, save), 'text/html').body
        .firstElementChild
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

  renderMyVideoInfosSection = length => {
    const $myVideoInfosSection = $('#my-video-infos');
    $myVideoInfosSection.innerHTML = myVideoInfosTemplate(length);
  };

  resetView = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = '';
  };
}

export default MyYoutubeView;
