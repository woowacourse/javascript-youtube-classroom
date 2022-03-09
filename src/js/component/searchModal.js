import youtubeSearchAPI from '../api/YoubeSearchapi.js';
import { getLocalStorage, setLocalStorage } from '../storage/localStorage.js';
import { checkValidSearchInput, checkMaxStorageVolume } from '../util/validator.js';
import template from './templates.js';
import throttle from '../util/throttle.js';

class SearchModal {
  constructor() {
    this.$modalContainer = document.querySelector('.modal-container');
    this.$dimmer = document.querySelector('.dimmer');
    this.$searchInputKeyword = document.querySelector('#search-input-keyword');
    this.$searchButton = document.querySelector('#search-button');
    this.$videoListContainer = document.querySelector('.video-list');
    this.$searchResult = document.querySelector('.search-result');
    this.pageToken = null;
    this.requestAdditionalSearchResult = throttle(
      this.requestAdditionalSearchResult.bind(this),
      1000,
    );
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
    this.$searchInputKeyword.addEventListener('keypress', this.searchVideo.bind(this));
    this.$searchButton.addEventListener('click', this.searchVideo.bind(this));
    this.$videoListContainer.addEventListener(
      'scroll',
      this.requestAdditionalSearchResult.bind(this),
    );
    this.$videoListContainer.addEventListener('click', this.saveVideo.bind(this));
  }

  searchVideo(event) {
    if ((event.type === 'keypress' && event.key === 'Enter') || event.type === 'click') {
      try {
        this.keyword = this.$searchInputKeyword.value;
        checkValidSearchInput(this.keyword);
        this.initVideoState();
        this.callApi();
      } catch (err) {
        console.dir(err);
        // alert(err);
      }
    }
  }

  initVideoState() {
    this.removeNoResult();
    this.$videoListContainer.replaceChildren();
    this.$searchInputKeyword.blur();
    this.$videoListContainer.classList.remove('hide');
    this.pageToken = null;
  }

  checkSavedVideo(id) {
    return getLocalStorage('save').includes(id);
  }

  saveVideo(e) {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }
    try {
      checkMaxStorageVolume();
      this.saveVideoToLocalStorage(e);
      e.target.classList.add('hide');
    } catch (err) {
      alert(err.message);
    }
  }

  saveVideoToLocalStorage({ target }) {
    const savedVideos = getLocalStorage('save');
    const newVideo = target.closest('li').dataset.videoId;

    setLocalStorage('save', savedVideos.concat(newVideo));
  }

  requestAdditionalSearchResult() {
    const { offsetHeight, scrollHeight, scrollTop } = this.$videoListContainer;
    if (scrollTop === 0) return;
    if (offsetHeight + scrollTop >= scrollHeight) {
      this.callApi();
    }
  }

  callApi() {
    this.renderSkeletonImage();
    youtubeSearchAPI
      .searchByPage(this.keyword, this.pageToken)
      .then((data) => {
        this.renderResult(data);
      })
      .catch((err) => {
        this.renderNetworkError(err);
      });
  }

  renderNetworkError(e) {
    this.removeSkeleton();
    if (e.name === '403 Error') {
      this.$videoListContainer.insertAdjacentHTML('beforeend', template.exceedCapacityErrorImage());
    }
  }

  renderResult(data) {
    this.removeSkeleton();
    if (data.items.length === 0) {
      this.renderNoResultImage();
      return;
    }
    this.pageToken = data.nextPageToken;
    this.renderVideo(data);
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

  renderVideo(data) {
    data.items.forEach((item) => {
      const { videoId } = item.id;
      this.$videoListContainer.insertAdjacentHTML(
        'beforeend',
        template.videoItems({
          videoId,
          isSaved: this.checkSavedVideo(videoId),
          ...item.snippet,
        }),
      );
    });
  }
}

export default SearchModal;
