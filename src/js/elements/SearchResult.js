import SearchedVideo from '../stores/SearchedVideo';
import CustomElement from '../abstract/CustomElement';
import { $ } from '../utils';
import TEMPLATE from '../templates';

import './VideoList';

class SearchResult extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SearchedVideo.instance.subscribe(this);
  }

  template() {
    return TEMPLATE.SEARCH_RESULT;
  }

  notify(type, data) {
    if (type !== 'search') return;

    if (!data.length) {
      this.showNoResult();
      return;
    }

    this.showResult();
  }

  showNoResult() {
    $('.search-result--no-result', this).classList.remove('hidden');
    $('ul', this).classList.add('hidden');
  }

  showResult() {
    $('.search-result--no-result', this).classList.add('hidden');
    $('ul', this).classList.remove('hidden');
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
