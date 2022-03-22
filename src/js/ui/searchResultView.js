import { on, emit } from '../util/event';
import template from './templates';
import { $ } from '../util/selector';
import throttle from '../util/throttle';

class SearchResultView {
  constructor(target, keywordInput, searchresult) {
    this.$target = target;
    this.$searchInputKeyword = keywordInput;
    this.$searchResult = searchresult;
    this.onThrottledScroll = throttle(this.onScroll.bind(this), 300);

    this.bindEvents();
  }

  bindEvents() {
    on(this.$target, 'scroll', this.onThrottledScroll.bind(this));
  }

  onScroll() {
    const { offsetHeight, scrollHeight, scrollTop } = this.$target;
    emit(this.$target, '@search', { offsetHeight, scrollHeight, scrollTop });
  }

  reset() {
    this.resetSearchResult();
    this.resetEmptyResult();
  }

  resetSearchResult() {
    this.resetEmptyResult();
    this.$target.replaceChildren();
    this.$target.classList.remove('hide');
    this.$searchInputKeyword.blur();
  }

  resetEmptyResult() {
    const $noResultContainer = $('.no-result');
    if ($noResultContainer) {
      $noResultContainer.remove();
      this.$searchResult.classList.remove('search-result--no-result');
    }
  }

  renderSearchResult(items) {
    if (items.length === 0) {
      this.renderEmptyResultImage();
      return;
    }
    this.renderVideo(items);
  }

  renderVideo(items) {
    items.forEach((item) => {
      this.$target.insertAdjacentHTML('beforeend', template.videoItems(item));
    });
  }

  renderEmptyResultImage() {
    this.$target.classList.add('hide');
    this.$searchResult.insertAdjacentHTML('beforeend', template.emptySearchResult());
    this.$searchResult.classList.add('search-result--no-result');
  }
}

export default SearchResultView;
