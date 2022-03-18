import SearchVideoStore from '../stores/SearchVideoStore';
import CustomElement from '../abstract/CustomElement';
import { $ } from '../utils';
import NotFoundImage from '../../assets/images/not_found.png';

import './SearchVideoList';

class SearchResult extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SearchVideoStore.instance.subscribe(this);
  }

  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <h3 hidden>검색 결과</h3>
      <ul is="search-video-list" class="video-list"></ul>
      <section class="search-result search-result--no-result hidden">
        <h3 hidden>검색 결과</h3>
        <div class="no-result">
          <img src=${NotFoundImage} alt="no result image" class="no-result__image">
          <p class="no-result__description">
            검색 결과가 없습니다<br />
            다른 키워드로 검색해보세요
          </p>
        </div>
      </section>
    `;
  }

  notify(type, data) {
    if (type !== 'search') return;

    if (data.length === 0) {
      this.showNoResult();
    }
  }

  showNoResult() {
    $('.search-result--no-result').classList.remove('hidden');
    $('.video-list', this).classList.add('hidden');
  }

  showResult() {
    $('.search-result--no-result').classList.add('hidden');
    $('.video-list', this).classList.remove('hidden');
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
