import VideoItem from './VideoItem.js';

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
  }

  showModal() {
    this.$modalContainer.classList.remove('hide');
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
  }

  bindVideoListScroll(callback) {
    this.$videoList.addEventListener('scroll', () => {
      callback(this.$searchInput.value);
    });
  }

  resetVideoList() {
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
    console.log(parsedData);
    this.getSkeletonTemplate();
    this.updateVideoItems(parsedData);
  }

  updateVideoItems(data) {
    this.videoItemList
      .slice(-10)
      .forEach((videoItem, index) => videoItem.getVideoItemTemplate(data[index]));
  }
}
