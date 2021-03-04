import { $ } from '../utils/util.js';
import { searchVideoTemplate } from './template.js';
class MyYoutubeView {
  renderVideoArticles = infos => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    infos.forEach(info => {
      $searchVideoWrapper.innerHTML += searchVideoTemplate(info);
    });
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
