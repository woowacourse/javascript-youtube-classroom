import CustomElement from '../abstract/CustomElement';
import { $ } from '../utils';
import TEMPLATE from '../templates';

class SearchResult extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_RESULT;
  }

  partialRender(videos) {
    videos.forEach((video) => {
      $('.video-list').insertAdjacentHTML(
        'beforeend',
        `<video-item data-video=${JSON.stringify(video)}></video-item>`
      );
    });
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
