import VideoStore from '../VideoStore';
import CustomElement from '../abstract/CustomElement';
import { $ } from '../utils';
import TEMPLATE from '../templates';

class SearchResult extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    this.subscribe();
  }

  template() {
    return TEMPLATE.SEARCH_RESULT;
  }

  subscribe() {
    VideoStore.instance.subscribe(this);
  }

  notify(type, data) {
    if (type !== 'search') return;

    if (data.length === 0) {
      this.showNoResult();

      return;
    }

    this.showResult();
  }

  showNoResult() {
    $('.search-result--no-result').classList.remove('hidden');
    $('ul', this).classList.add('hidden');
  }

  showResult() {
    $('.search-result--no-result').classList.add('hidden');
    $('ul', this).classList.remove('hidden');
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
