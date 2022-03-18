import { EVENT } from '../constants';
import { $, $$, debounce } from '../util';
import { addListener, dispatch } from '../util/event';
import { template, MESSAGE } from './template';

export default class SearchResultView {
  constructor() {
    this.$searchResultSection = $('#search-result-section');
    this.$searchResultVideoList = $('#search-result-video-list', this.$searchResultSection);
    this.$noResultContainer = $('#no-result-container', this.$searchResultSection);
    this.$noResultDescription = $('#no-result-description', this.$noResultContainer);

    this.$searchResultVideoList.addEventListener('scroll', debounce(this.onScrollVideoList.bind(this), 500));
    this.$searchResultVideoList.addEventListener('click', this.onClickVideoSaveButton.bind(this));

    addListener(EVENT.UPDATE_SEARCH_STATE, this.updateOnSearchState.bind(this));
  }

  onScrollVideoList() {
    const { scrollTop, clientHeight, scrollHeight } = this.$searchResultVideoList;
    if (scrollTop + clientHeight + 50 < scrollHeight) return;
    dispatch(EVENT.SEARCH_ON_SCROLL);
  }

  onClickVideoSaveButton(e) {
    if (e.target.id === 'save-button') {
      const video = e.target.parentNode.dataset;
      dispatch(EVENT.SAVE_VIDEO, { video });
      e.target.remove();
    }
  }

  updateOnSearchState(e) {
    const { searchState } = e.detail;
    if (searchState === 'READY') { this.resetSearchResult(); };
    if (searchState === 'LOADING') { this.updateOnLoading(); };
    if (searchState === 'SUCCESS') { this.updateOnNewDataReceived(e.detail.videos); }
    if (searchState === 'ERROR') { this.showErrorResult(); }
  }

  resetSearchResult() {
    this.$searchResultVideoList.scrollTo(0, 0);
    this.$searchResultVideoList.innerHTML = template.skeletonListItem();
    this.$firstSkeletonListItem = $('.skeleton', this.$searchResultVideoList);
  }
  
  updateOnLoading() {
    this.toggleSkeletonListItemVisibility();
    if (this.$searchResultVideoList.classList.contains('hide')) {
      this.showSearchResultVideoList();
    }
  }

  updateOnNewDataReceived(videos) {
    if (videos.length === 0) {
      this.showNoResult();
      this.toggleSkeletonListItemVisibility();
      return;
    }
    const listItems = videos.map((video) => template.searchResultListItem(video)).join('');
    this.$firstSkeletonListItem.insertAdjacentHTML('beforebegin', listItems);
    this.toggleSkeletonListItemVisibility();
  }

  toggleSkeletonListItemVisibility() {
    $$('.skeleton', this.$searchResultVideoList).forEach((item) => {
      item.classList.toggle('hide');
    });
  }

  showSearchResultVideoList() {
    this.$noResultContainer.classList.add('hide');
    this.$searchResultVideoList.classList.remove('hide');
    this.$searchResultSection.classList.remove('search-result--no-result');
  }

  showNoResult() {
    this.$noResultDescription.innerHTML = MESSAGE.NO_RESULT;
    this.$noResultContainer.classList.remove('hide');
    this.$searchResultVideoList.classList.add('hide');
    this.$searchResultSection.classList.add('search-result--no-result');
  }

  showErrorResult() {
    this.$noResultDescription.innerHTML = MESSAGE.ERROR_RESULT;
    this.$noResultContainer.classList.remove('hide');
    this.$searchResultVideoList.classList.add('hide');
    this.$searchResultSection.classList.add('search-result--no-result');
  }
}
