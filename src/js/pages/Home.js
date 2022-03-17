import { storedResultStyled } from '../common/template';
import VideoCardContainer from '../common/VideosCardContainer';
import { getStorageVideos } from '../utils/localStorage';

export default class Home {
  constructor(element) {
    this.element = element;
    this.configureDOMs();
    this.bindEvents();
    this.VideoCardContainer = new VideoCardContainer(this.videoListWrapper);
    this.renderVideoList();
  }

  configureDOMs() {
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.element.insertAdjacentHTML('beforeend', storedResultStyled);
    this.videoListWrapper = this.element.querySelector('.video-list');
  }

  bindEvents() {
    this.searchModalButton.addEventListener('click', this.openModalHandler);
  }

  renderVideoList() {
    const videoList = getStorageVideos();
    this.VideoCardContainer.setState({ videoList });
  }

  openModalHandler = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  };
}
