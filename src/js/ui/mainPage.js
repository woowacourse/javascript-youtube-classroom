import {
  removeLocalStorage,
  toggleWatchedToStorage,
} from '../domain/localStorage.js';
import { VideoStorage } from '../domain/VideoStorage.js';
import MainPagePresenter from '../presenter/MainPagePresenter.js';
import SearchModalPresenter from '../presenter/SearchModalPresenter.js';
import template from './templates.js';

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.$navTab = document.querySelector('.nav-tab');
    this.$dimmer = document.querySelector('.dimmer');
    this.$videoListContainer = document.querySelector('.video-list-grid');
    this.videoStorage = new VideoStorage();
    this.searchModalPresenter = new SearchModalPresenter();
    this.mainPagePresenter = new MainPagePresenter();
    this.menuState = 'not-watched-tab-menu';
  }

  init() {
    this.bindEvent();
    this.videoStorage // data
      .initVideoList()
      .then((data) => this.initStorageView(data));
  }

  bindEvent() {
    this.$navTab.addEventListener('click', this.changeTab.bind(this)); //  event
    this.$searchModalButton.addEventListener(
      'click',
      this.searchModalPresenter.toggleModalContainerView.bind(
        this.searchModalPresenter, // view
      ),
    );
    this.$dimmer.addEventListener(
      'click',
      this.searchModalPresenter.initModalState.bind(this.searchModalPresenter), // view
    );
    this.$videoListContainer.addEventListener(
      'click',
      this.handleVideo.bind(this),
    ); //  event
  }

  initStorageView() {
    this.mainPagePresenter.renderVideoList(
      this.videoStorage.notWachedVideoList,
    ); // render + data
  }

  appendList(item) {
    this.mainPagePresenter.removeNoVideoImg(); // render
    this.$videoListContainer.insertAdjacentHTML(
      'beforeend',
      template.storageVideoItem(item),
    );
  }

  changeTab({ target: { id } }) {
    this.mainPagePresenter.toggleTabChoosed();
    this.mainPagePresenter.renderVideo(id, this.videoStorage); // render
  }

  handleVideo({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    const id = target.closest('li').dataset.videoId; // data
    if (target.classList.contains('video-watched--btn')) {
      this.changeStatusVideo(target, id);
    }
    if (target.classList.contains('video-delete--btn')) {
      this.deleteVideo(target, id);
    }
    this.mainPagePresenter.renderNoVideo(); // render
  }

  changeStatusVideo(target, id) {
    target.closest('li').remove(); // render
    this.videoStorage.toggleState(id); // data
    toggleWatchedToStorage(id); // data
  }

  deleteVideo(target, id) {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      target.closest('li').remove(); // render
      removeLocalStorage('save', id); // data
      removeLocalStorage('watched', id); // data
      this.videoStorage.removeVideo(id); // data
    }
  }
}

export default MainPage;
