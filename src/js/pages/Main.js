import { getStorage, LOCALSTORAGE_KEY } from '../utils/localStorage';
// import VideoCardContainer from '../common/VideoCardContainer';
import MainVideoCardContainer from '../common/Main/MainVideoCardContainer';

export default class Main {
  constructor(element) {
    this.element = element;
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.watchLaterVideoList = this.element.querySelector('.watch-later-video-list');

    this.searchModalButton.addEventListener('click', this.openModalHandler.bind(this));

    this.videoCardContainer = new MainVideoCardContainer(
      document.querySelector('.watch-later-video-list'),
    );
    this.renderStoredVideoList();
  }

  renderStoredVideoList() {
    this.template(getStorage(LOCALSTORAGE_KEY.VIDEO_IDS));
  }

  template(storedVideoList) {
    this.videoCardContainer.setState({ videos: storedVideoList });
  }

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }
}
