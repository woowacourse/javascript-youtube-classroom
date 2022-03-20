import VideoCardContainer from '../common/VideosCardContainer';
import { getStorageVideos } from '../utils/localStorage';
import toast from '../common/toast';
import { EMPTY_VIDEO_MESSAGE } from '../constants';

const toastPopup = toast();

export default class Home {
  constructor(element) {
    this.element = element;
    this.currentFilter = 'stored';

    // configureDOMs
    this.storedVideoFilterButton = this.element.querySelector('#stored-video-filter-button');
    this.watchedVideoFilterButton = this.element.querySelector('#watched-video-filter-button');
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.nav = this.element.querySelector('nav');
    this.videoListWrapper = this.element.querySelector('.video-list');
    this.dimmer = document.querySelector('.dimmer');
    this.modalContainer = document.querySelector('.modal-container');

    // bindEvents
    this.storedVideoFilterButton.addEventListener('click', this.showStoredVideosHandler);
    this.watchedVideoFilterButton.addEventListener('click', this.showWatchedVideosHandler);
    this.searchModalButton.addEventListener('click', this.openModalHandler);
    this.dimmer.addEventListener('click', this.closeModalHandler);

    this.VideoCardContainer = new VideoCardContainer(
      this.videoListWrapper,
      { currentPage: 'Home' }
    );
    this.renderVideoList();
  }

  emptyVideoList(videoList) {
    if (videoList.length === 0) {
      toastPopup(EMPTY_VIDEO_MESSAGE);
    }
  }

  renderVideoList() {
    const videoList = Object.values(getStorageVideos({ filter: this.currentFilter }));
    this.emptyVideoList(videoList);
    this.VideoCardContainer.setState({ videoList, filter: this.currentFilter });
  }

  clickedFilterButton() {
    this.storedVideoFilterButton.classList.toggle('clicked');
    this.watchedVideoFilterButton.classList.toggle('clicked');
  }

  showStoredVideosHandler = () => {
    if (this.currentFilter === 'stored') return;

    this.clickedFilterButton();
    this.currentFilter = 'stored';

    this.viewClear();
    this.renderVideoList();
  };

  showWatchedVideosHandler = () => {
    if (this.currentFilter === 'watched') return;

    this.clickedFilterButton();
    this.currentFilter = 'watched';

    this.viewClear();
    this.renderVideoList();
  };

  openModalHandler = () => {
    this.modalContainer.classList.remove('hide');
    this.dimmer.classList.remove('hide');
  };

  closeModalHandler = () => {
    this.modalContainer.classList.add('hide');
    this.dimmer.classList.add('hide');

    this.currentFilter = 'stored';
    this.viewClear();
    this.renderVideoList();
  };

  viewClear() {
    this.videoListWrapper.replaceChildren();
  }
}
