import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';

class SearchResult extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_RESULT;
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
