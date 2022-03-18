import { $, $$, debounce, event } from '../util';
import { template, MESSAGE } from './template';

export default class SearchResultView {
  constructor() {
    this.isShownNoResult = false;
    this.$searchModal = $('#search-modal');
    this.$searchResultSection = $('#search-result-section', this.$searchModal);
    this.$searchResultVideoList = $('#search-result-video-list', this.$searchResultSection);
    this.$noResultContainer = $('#no-result-container', this.$searchResultSection);
    this.$noResultDescription = $('#no-result-description', this.$noResultContainer);

    this.$searchResultVideoList.addEventListener('scroll', debounce(this.onScrollVideoList.bind(this), 500));
    this.$searchResultVideoList.addEventListener('click', this.onClickVideoSaveButton.bind(this));

    event.addListener('updateSearchState', this.updateOnSearchState.bind(this));
  }

  onScrollVideoList() {
    const { scrollTop, clientHeight, scrollHeight } = this.$searchResultVideoList;
    if (scrollTop + clientHeight + 50 < scrollHeight) return;
    event.dispatch('searchOnScroll');
  }

  onClickVideoSaveButton(e) {
    if (e.target.id === 'save-button') {
      const video = e.target.parentNode.dataset;
      event.dispatch('saveVideo', { video });
      e.target.remove();
    }
  }

  updateOnSearchState(e) {
    const { state } = e.detail;
    if (state === 'READY') { this.resetSearchResult(); };
    if (state === 'LOADING') { this.updateOnLoading(); };
    if (state === 'SUCCESS') { this.updateOnNewDataReceived(e.detail.videos); }
    if (state === 'ERROR') { this.showErrorResult(); }
  }

  resetSearchResult() {
    this.$searchResultVideoList.scrollTo(0, 0);
    this.$searchResultVideoList.innerHTML = template.skeletonListItem();
    this.$firstSkeletonListItem = $('.skeleton', this.$searchResultVideoList);
  }
  
  updateOnLoading() {
    this.changeSkeletonListItemVisibility();
  }

  updateOnNewDataReceived(videos) {
    if (videos.length === 0) {
      this.showNoResult();
      return;
    }
    if (this.isShownNoResult) {
      this.showSearchResultVideoList();
    }
    const listItems = videos.map((video) => template.searchResultListItem(video)).join('');
    this.$firstSkeletonListItem.insertAdjacentHTML('beforebegin', listItems);
    this.changeSkeletonListItemVisibility();
  }

  changeSkeletonListItemVisibility() {
    $$('.skeleton', this.$searchResultVideoList).forEach((item) => {
      if (!item.classList.contains('hide')) {
        item.classList.add('hide');
      } else {
        item.classList.remove('hide');
      }
    });
  }

  showSearchResultVideoList() {
    this.isShownNoResult = false;
    this.$noResultContainer.classList.add('hide');
    this.$searchResultVideoList.classList.remove('hide');
    this.$searchResultSection.classList.remove('search-result--no-result');
  }

  showNoResult() {
    this.isShownNoResult = true;
    this.$noResultDescription.innerHTML = MESSAGE.NO_RESULT;
    this.$noResultContainer.classList.remove('hide');
    this.$searchResultVideoList.classList.add('hide');
    this.$searchResultSection.classList.add('search-result--no-result');
  }

  showErrorResult() {
    this.isShownNoResult = true;
    this.$noResultDescription.innerHTML = MESSAGE.ERROR_RESULT;
    this.$noResultContainer.classList.remove('hide');
    this.$searchResultVideoList.classList.add('hide');
    this.$searchResultSection.classList.add('search-result--no-result');
  }
}
