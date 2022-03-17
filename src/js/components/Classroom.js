import { getVideoItemsFromLocalStorage, saveVideoItemToLocalStorage } from '../utils/localStorage.js';
import { makeThumbnailTemplate } from '../utils/templates.js';

export class Classroom {
  constructor(props) {
    this.props = props;

    this.openModalButton = document.getElementById('search-modal-button');
    this.openModalButton.addEventListener('click', this.props.openModal);

    this.contentsContainer = document.getElementById('classroom-contents-container');
    this.willSeeVideoButton = document.getElementById('will-see-video-button');

    this.willSeeVideoButton.addEventListener('click', this.handleWillSeeVideoNav);
    this.contentsContainer.addEventListener('click', this.handleContentsButton);
  }

  handleWillSeeVideoNav = async () => {
    this.clearClassroomContentsContainer();
    this.videoList = getVideoItemsFromLocalStorage();
    console.log(this.videoList);
    this.contentsContainer.insertAdjacentHTML(
      'beforeend',
      this.videoList
        .map((video) => {
          if (video.watchLater === true) {
            return makeThumbnailTemplate(video);
          }
        })
        .join(''),
    );
  };

  clearClassroomContentsContainer() {
    this.contentsContainer.innerHTML = ``;
  }

  handleContentsButton = (e) => {
    if (e.target.classList.contains('already-watch-button')) {
      this.videoList.forEach((video) => {
        if (e.target.id === video.id) {
          video.watchLater = false;
          e.target.parentNode.parentNode.remove();
        }
      });
    }

    if (e.target.classList.contains('discard-button')) {
      this.videoList = this.videoList.filter((video) => video.id !== e.target.id);
      e.target.parentNode.parentNode.remove();
    }

    saveVideoItemToLocalStorage(this.videoList);
  };
}
