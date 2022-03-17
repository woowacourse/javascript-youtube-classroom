import { getVideoItemsFromLocalStorage, saveVideoItemToLocalStorage } from '../utils/localStorage.js';
import { makeThumbnailTemplate, noClassroomContentsTemplate } from '../utils/templates.js';

export class Classroom {
  constructor(props) {
    this.props = props;

    this.openModalButton = document.getElementById('search-modal-button');
    this.openModalButton.addEventListener('click', this.props.openModal);

    this.nav = document.getElementById('nav');
    this.contentsContainer = document.getElementById('classroom-contents-container');
    this.willSeeVideoButton = document.getElementById('will-see-video-button');
    this.alreadyWatchedVideoButton = document.getElementById('already-watched-video-button');

    this.willSeeVideoButton.addEventListener('click', this.handleWillSeeVideoNav);
    this.alreadyWatchedVideoButton.addEventListener('click', this.handleAlreadyWatchedVideoNav);
    this.contentsContainer.addEventListener('click', this.handleContentsButton);
  }

  handleWillSeeVideoNav = async () => {
    this.clearClassroomContentsContainer();

    this.alreadyWatchedVideoButton.classList.remove('clicked');
    this.willSeeVideoButton.classList.add('clicked');

    this.videoList = getVideoItemsFromLocalStorage();
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

    if (this.contentsContainer.childElementCount === 0) {
      this.contentsContainer.insertAdjacentHTML('beforeend', noClassroomContentsTemplate());
    }
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
      saveVideoItemToLocalStorage(this.videoList);
    }

    if (e.target.classList.contains('discard-button')) {
      if (window.confirm('진짜 지우실?')) {
        this.videoList = this.videoList.filter((video) => video.id !== e.target.id);
        e.target.parentNode.parentNode.remove();

        saveVideoItemToLocalStorage(this.videoList);
      }
    }
  };

  handleAlreadyWatchedVideoNav = () => {
    this.clearClassroomContentsContainer();

    this.willSeeVideoButton.classList.remove('clicked');
    this.alreadyWatchedVideoButton.classList.add('clicked');

    this.videoList = getVideoItemsFromLocalStorage();
    this.contentsContainer.insertAdjacentHTML(
      'beforeend',
      this.videoList
        .map((video) => {
          if (video.watchLater === false) {
            return makeThumbnailTemplate(video);
          }
        })
        .join(''),
    );

    if (this.contentsContainer.childElementCount === 0) {
      this.contentsContainer.insertAdjacentHTML('beforeend', noClassroomContentsTemplate());
    }
  };
}
