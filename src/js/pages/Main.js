import WatchedVideos from '../common/Main/WatchedVideos';
import WatchLaterVideos from '../common/Main/WatchLaterVideos';

export default class Main {
  constructor(element) {
    this.element = element;
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.videoList = this.element.querySelector('.watch-later-video-list');
    this.tabs = this.element.querySelector('#classroom-tabs');

    this.searchModalButton.addEventListener('click', this.openModalHandler);
    this.tabs.addEventListener('click', this.changeTab);

    this.watchedVideos = new WatchedVideos(this.videoList);
    this.watchLaterVideos = new WatchLaterVideos(this.videoList);
    this.focusedTab = 'watch-later';
    this.renderStoredVideoList();
  }

  changeTab = (e) => {
    if (e.target.classList.contains('button')) {
      this.focusedTab = e.target.dataset.tab;
      Array.from(this.tabs.children).forEach((tab) => {
        tab.className =
          tab.dataset.tab === e.target.dataset.tab
            ? 'button nav__button focus'
            : 'button nav__button';
      });
      this.renderStoredVideoList();
    }
  };

  renderStoredVideoList() {
    switch (this.focusedTab) {
      case 'watch-later':
        this.watchLaterVideos.render();
        break;
      case 'watched':
        this.watchedVideos.render();
        break;
      default:
        break;
    }
  }

  openModalHandler = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  };
}
