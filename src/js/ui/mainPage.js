import {
  removeLocalStorage,
  toggleWatchedToStorage,
} from '../domain/localStorage.js';
import { VideoStorage } from '../domain/VideoStorage.js';
import SearchModalPresenter from '../presenter/SearchModalPresenter.js';
import SearchModal from './searchModal.js';
import template from './templates.js';

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.videoStorage = new VideoStorage();
    this.modalComponent = new SearchModal(
      this.appendList.bind(this),
      this.videoStorage,
    );
    this.$dimmer = document.querySelector('.dimmer');
    this.menuState = 'not-watched-tab-menu';
    this.searchModalPresenter = new SearchModalPresenter();
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
      this.searchModalPresenter.toggleModalContainerView.bind(
        this.searchModalPresenter,
      ),
    );
    this.$dimmer.addEventListener(
      'click',
      this.searchModalPresenter.initModalState.bind(this.searchModalPresenter),
    );
    document
      .querySelector('.video-list-grid')
      .addEventListener('click', this.handleVideo.bind(this));
  }

  initStorageView() {
    this.renderVideoList(this.videoStorage.notWachedVideoList);
  }

  renderVideoList(videos) {
    this.removeNoVideoImg();
    document
      .querySelector('.video-list-grid')
      .insertAdjacentHTML(
        'beforeend',
        videos.map((item) => template.storageVideoItem(item)).join(''),
      );
    this.renderNoVideo();
  }

  removeNoVideoImg() {
    const noVideoImg = document.getElementById('no_video--img');
    if (noVideoImg) {
      noVideoImg.remove();
    }
  }

  renderNoVideo() {
    if (document.querySelector('.video-list-grid').children.length === 0)
      document
        .querySelector('#store-video-list')
        .insertAdjacentHTML('beforeend', template.noVideoList());
  }

  appendList(item) {
    this.removeNoVideoImg();
    document
      .querySelector('.video-list-grid')
      .insertAdjacentHTML('beforeend', template.storageVideoItem(item));
  }

  changeTab(e) {
    if (e.target.id === this.menuState) return;
    this.menuState = e.target.id;
    document
      .querySelectorAll('.nav-tab__button')
      .forEach((element) => element.classList.toggle('choosed'));
    this.renderVideo();
  }
  renderVideo() {
    document.querySelector('.video-list-grid').replaceChildren();
    if (this.menuState === 'not-watched-tab-menu') {
      this.renderVideoList(this.videoStorage.notWachedVideoList);
      return;
    }
    if (this.menuState === 'watched-tab-menu') {
      this.renderVideoList(this.videoStorage.wachedVideoList);
      return;
    }
  }
  handleVideo(e) {
    if (e.target.nodeName !== 'BUTTON') return;
    if (e.target.classList.contains('video-watched--btn')) {
      const id = e.target.closest('li').dataset.videoId;
      e.target.closest('li').remove();
      this.videoStorage.toggleState(id);
      toggleWatchedToStorage(id);
    }
    if (e.target.classList.contains('video-delete--btn')) {
      if (window.confirm('정말 삭제하실거에요??')) {
        const id = e.target.closest('li').dataset.videoId;
        e.target.closest('li').remove();
        removeLocalStorage('save', id);
        removeLocalStorage('watched', id);
        this.videoStorage.removeVideo(id);
      }
    }
    this.renderNoVideo();
  }
}

export default MainPage;
