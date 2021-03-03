import { $ } from '../utils/util.js';
import { searchVideoTemplate } from './template.js';
class MyYoutubeView {
  renderVideoArticles = infos => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    console.log(infos);
    console.log($searchVideoWrapper);
    infos.forEach(info => {
      $searchVideoWrapper.innerHTML += searchVideoTemplate(info);
      // $searchVideoWrapper.appendChild();
    });
  };
}

export default MyYoutubeView;
