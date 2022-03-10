import { $, $$ } from '../util';
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
    this.searchResultVideoList.innerHTML = '';
  }

  updateOnLoading() {
    this.searchResultVideoList.insertAdjacentHTML('beforeend', template.skeletonListItem());
  }

  removeSkeletonListItem() {
    $$('.skeleton', this.searchResultVideoList).forEach((listItem) => {
      listItem.remove();
    });
  }

  showSearchResultVideoList() {
    this.noResultContainer.classList.add('hide');
    this.searchResultVideoList.classList.remove('hide');
    this.searchResultSection.classList.remove('search-result--no-result');
    this.isShownNoResult = false;
  }

  showNoResult() {
    this.noResultContainer.classList.remove('hide');
    this.searchResultVideoList.classList.add('hide');
    this.searchResultSection.classList.add('search-result--no-result');
    this.noResultDescription.innerHTML = MESSAGE.NO_RESULT;
    this.isShownNoResult = true;
  }

  showErrorResult() {
    this.noResultContainer.classList.remove('hide');
    this.searchResultVideoList.classList.add('hide');
    this.searchResultSection.classList.add('search-result--no-result');
    this.noResultDescription.innerHTML = MESSAGE.ERROR_RESULT;
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
    this.searchResultVideoList.insertAdjacentHTML('beforeend', listItems);
  }
}
