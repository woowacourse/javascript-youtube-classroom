import { $ } from '../utils/util.js';
import { searchVideoTemplate } from './template.js';
class MyYoutubeView {
  renderVideoArticles = infos => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    infos.forEach(info => {
      $searchVideoWrapper.innerHTML += searchVideoTemplate(info);
    });
  };
}

export default MyYoutubeView;
