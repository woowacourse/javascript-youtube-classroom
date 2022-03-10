import template from './templates.js';
import throttle from '../util/throttle.js';
import SearchMachine from '../domain/SearchMachine.js';
import { checkSavedVideo } from '../util/validator.js';

class SearchModal {
  constructor() {
    this.$modalContainer = document.querySelector('.modal-container');
    this.$dimmer = document.querySelector('.dimmer');
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchButton = document.querySelector('#search-button');
    this.$videoListContainer = document.querySelector('.video-list');
    this.$searchResult = document.querySelector('.search-result');
    this.requestAdditionalSearchResult = throttle(
      this.requestAdditionalSearchResult.bind(this),
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
    const $noResultContainer = document.querySelector('.no-result');
    if ($noResultContainer) {
      $noResultContainer.remove();
      this.$searchResult.classList.remove('search-result--no-result');
    }
  }

  bindEvent() {
    this.$searchInputKeyword.addEventListener('keypress', this.submitKeywordHandler.bind(this));
    this.$searchButton.addEventListener('click', this.submitKeywordHandler.bind(this));
    this.$videoListContainer.addEventListener('click', this.saveVideo.bind(this));
  }

  submitKeywordHandler(event) {
    if ((event.type === 'keypress' && event.key === 'Enter') || event.type === 'click') {
      try {
        this.$videoListContainer.addEventListener('scroll', this.requestAdditionalSearchResult);
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

  requestAdditionalSearchResult() {
    const { offsetHeight, scrollHeight, scrollTop } = this.$videoListContainer;
    if (scrollTop === 0) return;
    if (offsetHeight + scrollTop >= scrollHeight) {
      this.searchVideo();
    }
  }

  searchVideo() {
    this.renderSkeletonImage();
    this.machine
      .search()
      .then((item) => this.renderResult(item))
      .catch((err) => this.renderNetworkError(err))
      .finally(this.removeSkeleton);
  }

  renderNetworkError(err) {
    if (err.name === '403 Error') {
      this.$videoListContainer.removeEventListener('scroll', this.requestAdditionalSearchResult);
      this.$videoListContainer.insertAdjacentHTML('beforeend', template.exceedCapacityErrorImage());
    }
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
      Array(10)
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
    this.$searchResult.insertAdjacentHTML('beforeend', template.noSearchResult());
    this.$searchResult.classList.add('search-result--no-result');
  }

  renderVideo(items) {
    items.forEach((item) => {
      const { videoId } = item.id;
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.videoItems({
          videoId,
          isSaved: checkSavedVideo(videoId),
          ...item.snippet,
        }),
      );
    });
  }
}

export default SearchModal;
