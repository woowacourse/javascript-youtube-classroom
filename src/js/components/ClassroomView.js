import {
  makeThumbnailTemplate,
  noClassroomContentsTemplate,
  makeSnackbarThumbnailTemplate,
} from '../utils/templates.js';
import { Classroom } from '../model/Classroom.js';
import { delay } from '../utils/common.js';

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
    this.snackbarContainer = document.getElementById('snackbar-container');

    this.contentsContainer.addEventListener('click', this.handleContentsButton);
    this.willSeeVideoButton.addEventListener('click', this.handleWillSeeVideoNav);
    this.alreadyWatchedVideoButton.addEventListener('click', this.handleAlreadyWatchedVideoNav);

    this.handleWillSeeVideoNav();
  }

  handleWillSeeVideoNav = async () => {
    this.clearClassroomContentsContainer();
    this.highlightNavButtons(this.willSeeVideoButton);

    this.classroom.getVideoItems();
    this.renderContents('watchLater');
    if (this.classroom.hasNoWillSeeVideo()) {
      this.contentsContainer.insertAdjacentHTML('beforeend', noClassroomContentsTemplate());
    }
  };

  handleAlreadyWatchedVideoNav = () => {
    this.clearClassroomContentsContainer();
    this.highlightNavButtons(this.alreadyWatchedVideoButton);

    this.classroom.getVideoItems();
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
      this.addSnackBar(e);
      this.toggleAlreadyWatchButton(e);
    }

    if (e.target.classList.contains('discard-button')) {
      this.addSnackBar(e);
      this.discardVideoCard(e);
    }
  };

  addSnackBar(e) {
    this.renderSnackBar(e);
    this.snackbarContainer.addEventListener('click', this.handleSnackBar);
  }

  renderSnackBar(e) {
    if (e.target.classList.contains('already-watch-button')) {
      if (e.target.classList.contains('clicked')) {
        this.snackbarContainer.insertAdjacentHTML(
          'afterbegin',
          makeSnackbarThumbnailTemplate(e, '볼 영상으로 이동했습니다.'),
        );
      } else {
        this.snackbarContainer.insertAdjacentHTML(
          'afterbegin',
          makeSnackbarThumbnailTemplate(e, '본 영상으로 이동했습니다.'),
        );
      }
      return true;
    }
    if (e.target.classList.contains('discard-button')) {
      this.snackbarContainer.insertAdjacentHTML('afterbegin', makeSnackbarThumbnailTemplate(e, '영상을 삭제했습니다.'));
      return true;
    }
    return false;
  }

  handleSnackBar = async (e) => {
    if (e.target.classList.contains('snackbar-close-button')) {
      e.target.parentNode.classList.add('disappear');
      await delay(2000);
      e.target.parentNode.remove();
    }

    if (e.target.classList.contains('snackbar-rollback-button')) {
      const rollbackItem = this.classroom.cache[e.target.parentNode.id];
      if (!rollbackItem.removed) {
        if (rollbackItem.watchLater) {
          this.classroom.moveVideoToWillSeeVideoById(rollbackItem);
        }
        if (!rollbackItem.watchLater) {
          this.classroom.moveVideoToAlreadyWatchedVideoById(rollbackItem);
        }
      }
      if (rollbackItem.removed) {
        delete rollbackItem.removed;
        this.classroom.saveVideoToVideoList(rollbackItem);
      }

      this.clearClassroomContentsContainer();
      this.classroom.getVideoItems();
      this.renderContents(rollbackItem.watchLater ? 'watchLater' : 'alreadyWatched');
      e.target.parentNode.remove();
    }
  };

  toggleAlreadyWatchButton(e) {
    this.classroom.saveExecutionToCache(e.target);
    if (e.target.classList.contains('clicked')) {
      this.moveVideoCardToWillSeeVideo(e);
      return;
    }
    this.moveVideoCardToAlreadyWatchVideo(e);
  }

  moveVideoCardToWillSeeVideo(e) {
    this.classroom.moveVideoToWillSeeVideoById(e.target);
    e.target.parentNode.parentNode.remove();
  }

  moveVideoCardToAlreadyWatchVideo(e) {
    this.classroom.moveVideoToAlreadyWatchedVideoById(e.target);
    e.target.parentNode.parentNode.remove();
  }

  discardVideoCard(e) {
    this.classroom.saveExecutionToCache(e.target);
    this.classroom.removeVideoItemByVideoId(e.target);
    e.target.parentNode.parentNode.remove();
  }

  highlightNavButtons() {
    this.willSeeVideoButton.classList.remove('clicked');
    this.alreadyWatchedVideoButton.classList.remove('clicked');

    [...arguments].forEach((button) => button.classList.add('clicked'));
  }
}
