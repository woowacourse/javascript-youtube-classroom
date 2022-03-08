import VideoItem from './VideoItem.js';
import mockData from '../utils/constants.js';

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
      callback();
    });
  }

  appendEmptyList() {
    this.$videoList.insertAdjacentHTML('beforeend', '<li></li>'.repeat(10));
  }

  appendVideoItem() {
    this.$videoList.childNodes.forEach(li => this.videoItemList.push(new VideoItem(li)));
  }

  getSkeletonTemplate() {
    this.videoItemList.forEach(videoItem => videoItem.getVideoItemTemplate());
  }

  getData() {
    this.getSkeletonTemplate();
    setTimeout(() => {
      this.updateVideoItems(mockData);
    }, 2000);
  }

  updateVideoItems(data) {
    this.videoItemList.forEach((videoItem, index) => videoItem.getVideoItemTemplate(data[index]));
  }
}
