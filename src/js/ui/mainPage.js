import { EVENT_TYPE, MENU_STATE } from '../constant/index.js';
import EventFactory from '../event/EventFactory.js';
import SearchModalPresenter from '../presenter/SearchModalPresenter.js';

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.$navTab = document.querySelector('.nav-tab');
    this.$dimmer = document.querySelector('.dimmer');
    this.$videoListContainer = document.querySelector('.video-list-grid');
    this.searchModalPresenter = new SearchModalPresenter();
    this.menuState = MENU_STATE.NOT_WATCHED_MENU;
  }

  init() {
    this.bindEvent();
    EventFactory.generate(EVENT_TYPE.LOAD_INITIAL_VIDEO);
  }

  bindEvent() {
    this.$navTab.addEventListener('click', this.changeTab.bind(this));
    this.$searchModalButton.addEventListener(
      'click',
      this.searchModalPresenter.toggleModalContainerView.bind(
        this.searchModalPresenter,
      ),
    );
    this.$dimmer.addEventListener(
      'click',
      this.searchModalPresenter.initModalState.bind(this.searchModalPresenter), // view
    );
    this.$videoListContainer.addEventListener(
      'click',
      this.handleVideo.bind(this),
    );
  }

  changeTab({ target: { id } }) {
    if (this.menuState === id) return;
    this.menuState = id;
    EventFactory.generate(EVENT_TYPE.CHANGE_TAB, { id });
  }

  handleVideo({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    const id = target.closest('li').dataset.videoId;
    if (target.classList.contains('video-watched--btn')) {
      EventFactory.generate(EVENT_TYPE.CHANGE_VIDEO_STATUS, { target, id });
    }
    if (target.classList.contains('video-delete--btn')) {
      this.deleteVideo(target, id);
    }
  }

  deleteVideo(target, id) {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      EventFactory.generate(EVENT_TYPE.DELETE_VIDEO, { target, id });
    }
  }
}

export default MainPage;
