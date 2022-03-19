import { storedResultStyled } from '../common/template';
import VideoCardContainer from '../common/VideosCardContainer';
import { getStorageVideos } from '../utils/localStorage';

export default class Home {
  constructor(element) {
    this.element = element;

    // configureDOMs
    this.storedVideoFilterButton = this.element.querySelector('#stored-video-filter-button');
    this.watchedVideoFilterButton = this.element.querySelector('#watched-video-filter-button');
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.nav = this.element.querySelector('nav');
    this.element.insertAdjacentHTML('beforeend', storedResultStyled);
    this.videoListWrapper = this.element.querySelector('.video-list');
    this.dimmer = document.querySelector('.dimmer');
    this.modalContainer = document.querySelector('.modal-container');

    // bindEvents
    this.storedVideoFilterButton.addEventListener('click', this.filterButtonHandler);
    this.watchedVideoFilterButton.addEventListener('click', this.filterButtonHandler);
    this.searchModalButton.addEventListener('click', this.openModalHandler);
    this.dimmer.addEventListener('click', this.closeModalHandler);

    this.VideoCardContainer = new VideoCardContainer(
      this.videoListWrapper,
      { currentPage: 'Home' }
    );
    this.renderVideoList();
  }

  renderVideoList() {
    const storedVideoList = Object.values(getStorageVideos({ filter: 'stored' }));
    this.VideoCardContainer.setState({ videoList: storedVideoList });
  }

  filterButtonHandler = () => {
    console.log('click');
  };

  openModalHandler = () => {
    this.modalContainer.classList.remove('hide');
    this.dimmer.classList.remove('hide');
  };

  closeModalHandler = () => {
    this.modalContainer.classList.add('hide');
    this.dimmer.classList.add('hide');

    this.viewClear();
    this.renderVideoList();
  };

  viewClear() {
    this.videoListWrapper.replaceChildren();
  }
}
