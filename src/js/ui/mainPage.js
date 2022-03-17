import { VideoStorage } from '../domain/VideoStorage.js';
import SearchModal from './searchModal.js';
import template from './templates.js';

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.modalComponent = new SearchModal(this.appendList);
    this.$dimmer = document.querySelector('.dimmer');
    this.videoStorage = new VideoStorage();
  }

  init() {
    this.bindEvent();
    this.videoStorage
      .initVideoList()
      .then((data) => this.initStorageView(data));
  }

  bindEvent() {
    document
      .querySelector('.nav-tab')
      .addEventListener('click', this.changeTab.bind(this));
    this.$searchModalButton.addEventListener(
      'click',
      this.modalComponent.toggleModalContainerView.bind(this.modalComponent),
    );
    this.$dimmer.addEventListener(
      'click',
      this.modalComponent.initModalState.bind(this.modalComponent),
    );
  }

  initStorageView() {
    document.querySelector('.video-list-grid').innerHTML =
      this.videoStorage.videoList
        .map((item) => {
          return template.storageVideoItem(item);
        })
        .join(' ');
  }

  appendList(item) {
    document
      .querySelector('.video-list-grid')
      .insertAdjacentHTML('beforeend', template.storageVideoItem(item));
  }

  changeTab() {
    document
      .querySelectorAll('.nav-tab__button')
      .forEach((element) => element.classList.toggle('choosed'));
  }
}

export default MainPage;
