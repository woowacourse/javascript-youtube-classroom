import { getVideoItemsFromLocalStorage, saveVideoItemToLocalStorage } from '../utils/localStorage.js';
import { makeThumbnailTemplate, noClassroomContentsTemplate } from '../utils/templates.js';
import { Classroom } from '../model/Classroom.js';

export class ClassroomView {
  constructor(props) {
    this.props = props;
    this.classroom = new Classroom();

    this.openModalButton = document.getElementById('search-modal-button');
    this.openModalButton.addEventListener('click', this.props.openModal);

    this.nav = document.getElementById('nav');
    this.contentsContainer = document.getElementById('classroom-contents-container');
    this.willSeeVideoButton = document.getElementById('will-see-video-button');
    this.alreadyWatchedVideoButton = document.getElementById('already-watched-video-button');

    this.contentsContainer.addEventListener('click', this.handleContentsButton);
    this.willSeeVideoButton.addEventListener('click', this.handleWillSeeVideoNav);
    this.alreadyWatchedVideoButton.addEventListener('click', this.handleAlreadyWatchedVideoNav);
  }

  handleWillSeeVideoNav = async () => {
    this.clearClassroomContentsContainer();
    this.highlightNavButtons(this.willSeeVideoButton);

    this.classroom.videoList = getVideoItemsFromLocalStorage();
    this.renderContents('watchLater');
    if (this.classroom.hasNoWillSeeVideo()) {
      this.contentsContainer.insertAdjacentHTML('beforeend', noClassroomContentsTemplate());
    }
  };

  handleAlreadyWatchedVideoNav = () => {
    this.clearClassroomContentsContainer();
    this.highlightNavButtons(this.alreadyWatchedVideoButton);

    this.classroom.videoList = getVideoItemsFromLocalStorage();
    this.renderContents('alreadyWatched');
    if (this.classroom.hasNoAlreadyWatchVideo()) {
      this.contentsContainer.insertAdjacentHTML('beforeend', noClassroomContentsTemplate());
    }
  };

  renderContents(key) {
    const later = key === 'watchLater' ? true : false;
    this.contentsContainer.insertAdjacentHTML(
      'beforeend',
      this.classroom.videoList
        .map((video) => {
          if (video.watchLater === later) {
            return makeThumbnailTemplate(video);
          }
        })
        .join(''),
    );
  }

  clearClassroomContentsContainer() {
    this.contentsContainer.innerHTML = ``;
  }

  handleContentsButton = (e) => {
    if (e.target.classList.contains('already-watch-button')) {
      this.moveVideoCardToAlreadyWatchVideo(e);
    }

    if (e.target.classList.contains('discard-button')) {
      this.discardVideoCard(e);
    }
  };

  moveVideoCardToAlreadyWatchVideo(e) {
    this.classroom.videoList.forEach((video) => {
      if (e.target.id === video.id) {
        video.watchLater = false;
        e.target.parentNode.parentNode.remove();
      }
    });
    saveVideoItemToLocalStorage(this.classroom.videoList);
  }

  discardVideoCard(e) {
    if (window.confirm('진짜 지우실?')) {
      this.classroom.videoList = this.classroom.videoList.filter((video) => video.id !== e.target.id);
      e.target.parentNode.parentNode.remove();

      saveVideoItemToLocalStorage(this.classroom.videoList);
    }
  }

  highlightNavButtons() {
    this.willSeeVideoButton.classList.remove('clicked');
    this.alreadyWatchedVideoButton.classList.remove('clicked');

    [...arguments].forEach((button) => button.classList.add('clicked'));
  }
}
