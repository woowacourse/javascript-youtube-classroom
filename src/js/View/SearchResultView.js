import { $, $$, hideElement, showElement } from '../dom';
import { template, MESSAGE } from './template';

export default class SearchResultView {
  constructor() {
    this.isShownNoResult = false;

    this.searchModal = $('#search-modal');
    this.searchResultSection = $('#search-result-section', this.searchModal);
    this.searchResultVideoList = $('#search-result-video-list', this.searchResultSection);
    this.noResultContainer = $('#no-result-container', this.searchResultSection);
    this.noResultDescription = $('#no-result-description', this.noResultContainer);

    this.bindEvents();
  }

  bindEvents() {
    this.searchResultVideoList.addEventListener('click', this.onClickVideoSaveButton.bind(this));
    this.searchResultVideoList.addEventListener('scroll', this.onScrollVideoList.bind(this));
  }

  onScrollVideoList() {
    const { scrollTop, clientHeight, scrollHeight } = this.searchResultVideoList;
    const searchOnScrollEvent = new CustomEvent('searchOnScroll', {
      detail: { scrollTop, clientHeight, scrollHeight },
    });
    this.searchModal.dispatchEvent(searchOnScrollEvent);
  }

  onClickVideoSaveButton({ target }) {
    if (target.tagName === 'BUTTON') {
      const saveVideoEvent = new CustomEvent('saveVideo', {
        detail: { target },
      });
      this.searchModal.dispatchEvent(saveVideoEvent);
    }
  }

  resetSearchResultVideoList() {
    this.searchResultVideoList.scrollTo(0, 0);
    this.searchResultVideoList.innerHTML = template.skeletonListItem();
  }

  updateOnLoading() {
    $$('.skeleton', this.searchResultVideoList).forEach((listItem) => {
      showElement(listItem);
    });
  }

  removeSkeletonListItem() {
    $$('.skeleton', this.searchResultVideoList).forEach((listItem) => {
      hideElement(listItem);
    });
  }

  showSearchResultVideoList() {
    hideElement(this.noResultContainer);
    showElement(this.searchResultVideoList);
    this.searchResultSection.classList.remove('search-result--no-result');
    this.isShownNoResult = false;
  }

  showNoResult() {
    hideElement(this.searchResultVideoList);
    showElement(this.noResultContainer);
    this.searchResultSection.classList.add('search-result--no-result');
    this.noResultDescription.innerHTML = MESSAGE.NO_RESULT;
    this.isShownNoResult = true;
  }

  updateOnSearchDataReceived(videos) {
    if (videos.length === 0) {
      this.showNoResult();
      return;
    }
    if (this.isShownNoResult) {
      this.showSearchResultVideoList();
    }
    const listItems = videos.map((video) => template.videoListItem(video)).join('');

    this.removeSkeletonListItem();
    $('.skeleton').insertAdjacentHTML('beforebegin', listItems);
  }

  addSaveButton(id) {
    const resultList = this.searchResultVideoList.children;
    [...resultList].forEach((item) => {
      if (item.dataset.videoId === id) {
        item.lastElementChild.classList.remove('hide');
      }
    });
  }
}
