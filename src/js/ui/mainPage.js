import EventFactory from '../event/EventFactory.js';
import SearchModalPresenter from '../presenter/SearchModalPresenter.js';

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.$navTab = document.querySelector('.nav-tab');
    this.$dimmer = document.querySelector('.dimmer');
    this.$videoListContainer = document.querySelector('.video-list-grid');
    this.searchModalPresenter = new SearchModalPresenter();
    this.menuState = 'not-watched-tab-menu';
  }

  init() {
    this.bindEvent();
    EventFactory.generate('INIT_VIDEO');
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
    EventFactory.generate('CHANGE_TAB', { id });
  }

  handleVideo({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    const id = target.closest('li').dataset.videoId;
    if (target.classList.contains('video-watched--btn')) {
      EventFactory.generate('CHANGE_VIDEO_STATUS', { target, id });
    }
    if (target.classList.contains('video-delete--btn')) {
      this.deleteVideo(target, id);
    }
  }

  deleteVideo(target, id) {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      EventFactory.generate('DELETE_VIDEO', { target, id });
    }
  }
}

export default MainPage;
