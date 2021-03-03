import { searchVideoTemplate } from './template.js';

class MyYoutubeView {
  renderVideoArticles = infos => {
    const $searchVideoWrapper = $('#search-video-wrapper');
    infos.forEach(info => {
      $searchVideoWrapper.appendChild(searchVideoTemplate(info));
    });
  };
}
