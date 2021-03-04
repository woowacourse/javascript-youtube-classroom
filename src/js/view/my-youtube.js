import { $ } from '../utils/util.js';
import { searchNotFoundTemplate, searchVideoTemplate } from './template.js';
class MyYoutubeView {
  renderVideoArticles = infos => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    infos.forEach(info => {
      // TODO : util화 하기
      const parser = new DOMParser();

      $searchVideoWrapper.append(
        parser.parseFromString(searchVideoTemplate(info), 'text/html').body
          .firstElementChild
      );
    });
  };

  renderNotFound = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = searchNotFoundTemplate();
  };

  renderSkeletonArticles = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = videoSkeletonTemplate().repeat(10);
  };

  resetView = () => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    $searchVideoWrapper.innerHTML = '';
  };
}

export default MyYoutubeView;
