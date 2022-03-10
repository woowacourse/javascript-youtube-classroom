import VideoItem from './VideoItem.js';
import storageManager from '../managers/storageManager.js';
export default class ModalView {
  constructor() {
    this.registerDOM();
    this.videoItemList = [];
  }

  registerDOM() {
    this.$modalContainer = document.querySelector('.modal-container');
    this.$dimmer = document.querySelector('.dimmer');
    this.$videoList = document.querySelector('.video-list');
    this.$searchButton = document.querySelector('.search-input__search-button');
    this.$searchInput = document.querySelector('.search-input__keyword');
    this.$searchNoResult = document.querySelector('.search-result.search-result--no-result');
  }

  showModal() {
    this.$modalContainer.classList.remove('hide');
    this.$searchNoResult.classList.add('hide');
    this.$searchInput.value = '';
    this.$searchInput.focus();
  }

  hideModal() {
    this.$modalContainer.classList.add('hide');
  }

  bindOnClickDimmer(callback) {
    this.$dimmer.addEventListener('click', callback);
  }

  bindOnClickSearchButton(callback) {
    this.$searchButton.addEventListener('click', () => {
      callback(this.$searchInput.value);
    });
    this.$searchInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        callback(this.$searchInput.value);
      }
    });
  }

  bindVideoListScroll(callback) {
    this.$videoList.addEventListener('scroll', () => {
      callback(this.$searchInput.value);
    });
  }

  bindVideoListClickStoreButton(callback) {
    this.$videoList.addEventListener('click', event => {
      try {
        if (event.target.tagName === 'BUTTON') {
          storageManager.checkBelowMaxLength();
          event.target.classList.add('hide');
          callback(event.target.dataset.videoid);
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }

  resetVideoList() {
    this.$searchNoResult.classList.add('hide');
    this.$videoList.classList.remove('hide');
    this.$videoList.textContent = '';
    this.videoItemList = [];
  }

  appendEmptyList() {
    this.$videoList.insertAdjacentHTML('beforeend', '<li></li>'.repeat(10));
  }

  appendVideoItem() {
    [...this.$videoList.childNodes].slice(-10).forEach(li => {
      this.videoItemList.push(new VideoItem(li));
    });
  }

  getSkeletonTemplate() {
    this.videoItemList.slice(-10).forEach(videoItem => videoItem.getVideoItemTemplate());
  }

  getData(parsedData) {
    this.getSkeletonTemplate();
    this.updateVideoItems(parsedData);
  }

  updateVideoItems(data) {
    this.videoItemList
      .slice(-10)
      .forEach((videoItem, index) => videoItem.getVideoItemTemplate(data[index]));
  }

  showNoResult() {
    this.$searchNoResult.classList.remove('hide');
    this.$videoList.classList.add('hide');
  }
}
