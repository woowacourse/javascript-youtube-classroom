import { REQUEST_VIDEO_QUANTITY } from '../constant';
import template from '../ui/templates';

export class SearchModalPresenter {
  constructor() {
    this.$modalContainer = document.querySelector('.modal-container');
    this.$videoListContainer = document.querySelector('.video-list');
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchResult = document.querySelector('.search-result');
  }
  toggleModalContainerView() {
    //render
    this.$modalContainer.classList.toggle('hide');
  }

  initModalState() {
    //render
    this.toggleModalContainerView(); //render
    this.$videoListContainer.replaceChildren(); // render
    this.$searchInputKeyword.value = ''; // render
    this.removeNoResult(); //render
  }

  removeNoResult() {
    //render
    const $noResultContainer = document.querySelector('.no-result');
    if ($noResultContainer) {
      $noResultContainer.remove();
      this.$searchResult.classList.remove('search-result--no-result');
    }
  }

  renderNoResultImage() {
    // render
    this.$videoListContainer.classList.add('hide');
    this.$searchResult.insertAdjacentHTML(
      'beforeend',
      template.noSearchResult(),
    );
    this.$searchResult.classList.add('search-result--no-result');
  }

  renderInitState() {
    this.removeNoResult(); // render
    this.$videoListContainer.replaceChildren(); // render
    this.$searchInputKeyword.blur(); // render
    this.$videoListContainer.classList.remove('hide'); // render
  }

  renderNetworkError(err) {
    if (err.name === ERROR_403) {
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.exceedCapacityErrorImage(), // render
      );
      return;
    }
    alert(err);
  }

  renderResult(items) {
    // render
    if (items.length === 0) {
      this.renderNoResultImage();
      return;
    }
    this.renderVideo(items);
  }

  renderSkeletonImage() {
    // render
    this.$videoListContainer.insertAdjacentHTML(
      'beforeend',
      Array(REQUEST_VIDEO_QUANTITY)
        .fill()
        .map((_) => template.skeletonItem())
        .join(' '),
    );
  }

  removeSkeleton() {
    // render
    document.querySelectorAll('.skeleton-container').forEach((element) => {
      element.remove();
    });
  }

  renderNoResultImage() {
    // render
    this.$videoListContainer.classList.add('hide');
    this.$searchResult.insertAdjacentHTML(
      'beforeend',
      template.noSearchResult(),
    );
    this.$searchResult.classList.add('search-result--no-result');
  }

  renderVideo(items) {
    // render
    items.forEach((item) => {
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.videoItems(item),
      );
    });
  }
}
