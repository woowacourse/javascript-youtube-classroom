import { isWatchingMenu, isWatchingVideo } from './elementValidator.js';

export default class ClassroomController {
  constructor({ classroomModel, classroomView }) {
    this.view = classroomView;
    this.model = classroomModel;
  }

  init() {
    this.onShowClassroom();
    this.attachEvents();
  }

  attachEvents() {
    this.view.$savedVideosWrapper.addEventListener('click', this.onRequestVideoManagement.bind(this));
    this.view.$watchingMenuButton.addEventListener('click', this.onNavigateWatchingVideos.bind(this));
    this.view.$watchedMenuButton.addEventListener('click', this.onNavigateWatchedVideos.bind(this));
  }

  onRequestVideoManagement({ target }) {
    if (!target.classList.contains('video-manage-btn')) {
      return;
    }

    const $video = target.closest('article');

    if (target.classList.contains('js-check-button')) {
      this.model.moveVideo($video.id);
      this.view.renderMovedVideo($video, isWatchingVideo($video));
    }
  }

  onNavigateWatchingVideos() {
    this.showWatchingVideos();
  }

  onNavigateWatchedVideos() {
    this.showWatchedVideos();
  }

  onShowClassroom() {
    this.view.renderVideosToPrepare(this.model.videos);

    if (isWatchingMenu(this.view.$savedVideosWrapper)) {
      this.showWatchingVideos();
      return;
    }
    this.showWatchedVideos();
  }

  showWatchingVideos() {
    this.view.renderOnlyWatchingVideos();

    if (this.model.hasNoWatchingVideoSaved()) {
      this.view.renderImageNoWatchingVideo();
    }
  }

  showWatchedVideos() {
    this.view.renderOnlyWatchedVideos();

    if (this.model.hasNoWatchedVideoSaved()) {
      this.model.hasNoWatchingVideoSaved()
        ? this.view.renderImageNoWatchingVideo()
        : this.view.renderImageNoWatchedVideo();
    }
  }
}
