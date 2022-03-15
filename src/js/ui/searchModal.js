import template from './templates.js';
import throttle from '../util/throttle.js';
import SearchMachine from '../domain/SearchMachine.js';
import { ERROR_403, REQUEST_VIDEO_QUANTITY } from '../constant';
import { $, $$ } from '../util/selector.js';

class SearchModal {
  constructor() {
    this.$modalContainer = $('.modal-container');
    this.$dimmer = $('.dimmer');
    this.$searchInputKeyword = $('#search-input-keyword');
    this.$searchButton = $('#search-button');
    this.$videoListContainer = $('.video-list');
    this.$searchResult = $('.search-result');
    this.scrollHandler = this.scrollVideoContainerHandler();
    this.requestAdditionalSearchResult = throttle(
      this.scrollHandler.requestAdditionalSearchResult,
      1000,
    ).bind(this);
    this.machine = new SearchMachine();
    this.bindEvent();
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
    const $noResultContainer = $('.no-result');
    if ($noResultContainer) {
      $noResultContainer.remove();
      this.$searchResult.classList.remove('search-result--no-result');
    }
  }

  bindEvent() {
    this.$searchInputKeyword.addEventListener('keypress', this.submitKeywordHandler.bind(this));
    this.$searchButton.addEventListener('click', this.submitKeywordHandler.bind(this));
    this.$videoListContainer.addEventListener('click', this.saveVideo.bind(this));
    this.$videoListContainer.addEventListener(
      'scroll',
      this.requestAdditionalSearchResult.bind(this),
    );
  }

  submitKeywordHandler(event) {
    if ((event.type === 'keypress' && event.key === 'Enter') || event.type === 'click') {
      try {
        this.scrollHandler.setError(false);
        this.machine.keyword = this.$searchInputKeyword.value;
        this.initVideoState();
        this.searchVideo();
      } catch (err) {
        alert(err);
      }
    }
  }

  initVideoState() {
    this.removeNoResult();
    this.$videoListContainer.replaceChildren();
    this.$searchInputKeyword.blur();
    this.$videoListContainer.classList.remove('hide');
    this.machine.initPageToken();
  }

  saveVideo({ target }) {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }

    try {
      const newVideo = target.closest('li').dataset.videoId;
      this.machine.saveVideoToLocalStorage(newVideo);
      target.classList.add('hide');
    } catch (err) {
      alert(err.message);
    }
  }

  scrollVideoContainerHandler() {
    let requestErrored = false;

    return {
      requestAdditionalSearchResult: () => {
        const { offsetHeight, scrollHeight, scrollTop } = this.$videoListContainer;
        if (scrollTop === 0 || requestErrored) return;
        if (offsetHeight + scrollTop >= scrollHeight) {
          this.searchVideo();
        }
      },

      setError: (isErrored) => {
        requestErrored = isErrored;
      },
    };
  }

  searchVideo() {
    this.renderSkeletonImage();
    this.machine
      .search()
      .then((items) => this.renderSearchResult(items))
      .catch((err) => this.renderNetworkError(err))
      .finally(this.removeSkeleton);
  }

  renderNetworkError(err) {
    if (err.name === ERROR_403) {
      this.scrollHandler.setError(true);
      this.$videoListContainer.insertAdjacentHTML('beforeend', template.exceedCapacityErrorImage());
      return;
    }
    this.$videoListContainer.insertAdjacentHTML('beforeend', template.responceFailedError());
  }

  renderSearchResult(items) {
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
    $$('.skeleton-container').forEach((element) => {
      element.remove();
    });
  }

  renderNoResultImage() {
    this.$videoListContainer.classList.add('hide');
    this.$searchResult.insertAdjacentHTML('beforeend', template.noSearchResult());
    this.$searchResult.classList.add('search-result--no-result');
  }

  renderVideo(items) {
    items.forEach((item) => {
      this.$videoListContainer.insertAdjacentHTML('beforeend', template.videoItems(item));
    });
  }
}

export default SearchModal;
