import {
  removeLocalStorage,
  toggleWatchedToStorage,
} from '../domain/localStorage.js';
import { VideoStorage } from '../domain/VideoStorage.js';
import EventFactory from '../event/EventFactory.js';
import MainPagePresenter from '../presenter/MainPagePresenter.js';
import SearchModalPresenter from '../presenter/SearchModalPresenter.js';

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
    EventFactory.generate('INIT_VIDEO');
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

  changeTab({ target: { id } }) {
    if (this.menuState === id) return;
    this.menuState = id;
    EventFactory.generate('CHANGE_TAB', { id });
  }

  handleVideo({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    const id = target.closest('li').dataset.videoId; // data
    if (target.classList.contains('video-watched--btn')) {
      EventFactory.generate('CHANGE_VIDEO_STATUS', { target, id });
    }
    if (target.classList.contains('video-delete--btn')) {
      this.deleteVideo(target, id);
    }
    this.mainPagePresenter.renderNoVideo(); // render
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
