import Component from '../../core/Component.js';
import './VideoCardList.js';

class SearchResult extends Component {
  template() {
    return `
      <h3 hidden>검색 결과</h3>
      <video-list class="video-list"></video-list>
    `;
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
