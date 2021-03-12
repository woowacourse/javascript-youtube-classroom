import {
  VIDEO_IS_MOVED_TO_WATCHED_MENU,
  VIDEO_IS_MOVED_TO_WATCHING_MENU,
  ARE_YOU_SURE_TO_REMOVE_VIDEO,
  VIDEO_IS_REMOVED_SUCCESSFULLY,
} from '../constants.js';
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
    const isWatching = isWatchingVideo($video);

    if (target.classList.contains('js-check-button')) {
      this.model.moveVideo($video.id);
      this.view.renderMovedVideo($video, isWatching);
      isWatching
        ? this.view.renderNotification(VIDEO_IS_MOVED_TO_WATCHED_MENU)
        : this.view.renderNotification(VIDEO_IS_MOVED_TO_WATCHING_MENU);
      this.showImageNoVideo();
      return;
    }

    if (target.classList.contains('js-remove-button')) {
      if (!window.confirm(ARE_YOU_SURE_TO_REMOVE_VIDEO)) return;
      this.model.removeVideo($video.id, isWatching);
      this.view.removeVideo($video);
      this.view.renderNotification(VIDEO_IS_REMOVED_SUCCESSFULLY);
      this.showImageNoVideo();
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
    this.showImageNoWatchingVideoSaved();
  }

  showWatchedVideos() {
    this.view.renderOnlyWatchedVideos();
    this.showImageNoWatchedVideoSaved();
  }

  showImageNoVideo() {
    isWatchingMenu(this.view.$savedVideosWrapper)
      ? this.showImageNoWatchingVideoSaved()
      : this.showImageNoWatchedVideoSaved();
  }

  showImageNoWatchingVideoSaved() {
    if (this.model.hasNoWatchingVideoSaved()) {
      this.view.renderImageNoWatchingVideo();
    }
  }

  showImageNoWatchedVideoSaved() {
    if (this.model.hasNoWatchedVideoSaved()) {
      this.model.hasNoWatchingVideoSaved()
        ? this.view.renderImageNoWatchingVideo()
        : this.view.renderImageNoWatchedVideo();
    }
  }
}
