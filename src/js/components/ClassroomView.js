import { getVideoItemsFromLocalStorage, saveVideoItemToLocalStorage } from '../utils/localStorage.js';
import { makeThumbnailTemplate, noClassroomContentsTemplate } from '../utils/templates.js';
import { Classroom } from '../model/Classroom.js';

export class ClassroomView {
  constructor(props) {
    this.props = props;
    this.classroom = new Classroom();

    this.openModalButton = document.getElementById('search-modal-button');
    this.openModalButton.addEventListener('click', this.props.openModal);
    this.openModalButton.addEventListener('click', this.removeNavButtonClicked);

    this.nav = document.getElementById('nav');
    this.contentsContainer = document.getElementById('classroom-contents-container');
    this.willSeeVideoButton = document.getElementById('will-see-video-button');
    this.alreadyWatchedVideoButton = document.getElementById('already-watched-video-button');

    this.willSeeVideoButton.addEventListener('click', this.handleWillSeeVideoNav);
    this.alreadyWatchedVideoButton.addEventListener('click', this.handleAlreadyWatchedVideoNav);
    this.contentsContainer.addEventListener('click', this.handleContentsButton);
  }

  removeNavButtonClicked = () => {
    this.alreadyWatchedVideoButton.classList.remove('clicked');
    this.willSeeVideoButton.classList.remove('clicked');
  };

  handleWillSeeVideoNav = async () => {
    this.clearClassroomContentsContainer();

    this.alreadyWatchedVideoButton.classList.remove('clicked');
    this.willSeeVideoButton.classList.add('clicked');

    this.classroom.videoList = getVideoItemsFromLocalStorage();
    this.contentsContainer.insertAdjacentHTML(
      'beforeend',
      this.classroom.videoList
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
      this.classroom.videoList.forEach((video) => {
        if (e.target.id === video.id) {
          video.watchLater = false;
          e.target.parentNode.parentNode.remove();
        }
      });
      saveVideoItemToLocalStorage(this.classroom.videoList);
    }

    if (e.target.classList.contains('discard-button')) {
      if (window.confirm('진짜 지우실?')) {
        this.classroom.videoList = this.classroom.videoList.filter((video) => video.id !== e.target.id);
        e.target.parentNode.parentNode.remove();

        saveVideoItemToLocalStorage(this.classroom.videoList);
      }
    }
  };

  handleAlreadyWatchedVideoNav = () => {
    this.clearClassroomContentsContainer();

    this.willSeeVideoButton.classList.remove('clicked');
    this.alreadyWatchedVideoButton.classList.add('clicked');

    this.classroom.videoList = getVideoItemsFromLocalStorage();
    this.contentsContainer.insertAdjacentHTML(
      'beforeend',
      this.classroom.videoList
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
