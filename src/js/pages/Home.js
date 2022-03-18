import { storedResultStyled } from '../common/template';
import VideoCardContainer from '../common/VideosCardContainer';
import { getStorageVideos } from '../utils/localStorage';

export default class Home {
  constructor(element) {
    this.element = element;
    this.configureDOMs();
    this.bindEvents();
    this.VideoCardContainer = new VideoCardContainer(
      this.videoListWrapper,
      { currentPage: 'Home' }
    );
    this.renderVideoList();
  }

  configureDOMs() {
    this.storedVideoFilterButton = this.element.querySelector('#stored-video-filter-button');
    this.watchedVideoFilterButton = this.element.querySelector('#watched-video-filter-button');
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.nav = this.element.querySelector('nav');
    this.element.insertAdjacentHTML('beforeend', storedResultStyled);
    this.videoListWrapper = this.element.querySelector('.video-list');
  }

  bindEvents() {
    this.storedVideoFilterButton.addEventListener('click', this.filterButtonHandler);
    this.watchedVideoFilterButton.addEventListener('click', this.filterButtonHandler);
    this.searchModalButton.addEventListener('click', this.openModalHandler);
  }

  renderVideoList() {
    const videoList = getStorageVideos();
    this.VideoCardContainer.setState({ videoList });
  }

  filterButtonHandler = () => {
    console.log('click');
  };

  openModalHandler = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  };
}
