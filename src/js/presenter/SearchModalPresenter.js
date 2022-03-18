import { ERROR_403, REQUEST_VIDEO_QUANTITY } from '../constant';
import template from '../ui/templates';

export default class SearchModalPresenter {
  constructor() {
    this.$modalContainer = document.querySelector('.modal-container');
    this.$videoListContainer = document.querySelector('.video-list');
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchResult = document.querySelector('.search-result');
  }

  toggleModalContainerView() {
    this.$modalContainer.classList.toggle('hide');
  }

  initModalState() {
    this.toggleModalContainerView();
    this.$videoListContainer.replaceChildren();
    this.$searchInputKeyword.value = '';
    this.removeNoResult();
  }

  removeNoResult() {
    const $noResultContainer = document.querySelector('.no-result');
    if ($noResultContainer) {
      $noResultContainer.remove();
      this.$searchResult.classList.remove('search-result--no-result');
    }
  }

  renderNoResultImage() {
    this.$videoListContainer.classList.add('hide');
    this.$searchResult.insertAdjacentHTML(
      'beforeend',
      template.noSearchResult(),
    );
    this.$searchResult.classList.add('search-result--no-result');
  }

  renderInitState() {
    this.removeNoResult();
    this.$videoListContainer.replaceChildren();
    this.$searchInputKeyword.blur();
    this.$videoListContainer.classList.remove('hide');
  }

  renderNetworkError(err) {
    if (err.name === ERROR_403) {
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.exceedCapacityErrorImage(),
      );
      return;
    }
    alert(err);
  }

  renderResult(items) {
    if (items.length === 0) {
      this.renderNoResultImage();
      return;
    }
    this.renderVideo(items);
  }

  renderSkeletonImage() {
    this.$videoListContainer.insertAdjacentHTML(
      'beforeend',
      Array(REQUEST_VIDEO_QUANTITY)
        .fill()
        .map((_) => template.skeletonItem())
        .join(' '),
    );
  }

  removeSkeleton() {
    document.querySelectorAll('.skeleton-container').forEach((element) => {
      element.remove();
    });
  }

  renderNoResultImage() {
    this.$videoListContainer.classList.add('hide');
    this.$searchResult.insertAdjacentHTML(
      'beforeend',
      template.noSearchResult(),
    );
    this.$searchResult.classList.add('search-result--no-result');
  }

  renderVideo(items) {
    items.forEach((item) => {
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.videoItems(item),
      );
    });
  }
}
