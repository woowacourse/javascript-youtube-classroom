import { getStorageVideoIDs, LOCALSTORAGE_KEY } from '../utils/localStorage';
import VideoCardContainer from '../common/VideosCardContainer';

export default class Main {
  constructor(element) {
    this.element = element;
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.watchLaterVideoList = this.element.querySelector('.watch-later-video-list');

    this.searchModalButton.addEventListener('click', this.openModalHandler.bind(this));

    // this.videosCardContainer = new VideoCardContainer();
    // this.renderStoredVideoList();
  }

  renderStoredVideoList() {
    this.template(getStorageVideoIDs(LOCALSTORAGE_KEY.VIDEO_IDS));
  }

  template(storedVideoList) {}

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }
}
