import VideoSaveManager from '../manager/VideoSaveManager.js';
import { isWatchingMenu, isWatchingVideo } from './elementValidator.js';
import { MESSAGE } from '../constants.js';

export default class ClassroomController {
  constructor({ classroomModel, classroomView }) {
    this.view = classroomView;
    this.model = classroomModel;
    this.videoSaveManager = new VideoSaveManager();
  }

  init() {
    this.showClassroom();
    this.attachEvents();
    this.videoSaveManager.subscribe(this.model.addVideo.bind(this.model));
    this.videoSaveManager.subscribe(this.view.renderSavedVideo.bind(this.view));
  }

  showClassroom() {
    this.view.renderVideosToPrepare(this.model.videos);

    isWatchingMenu(this.view.$savedVideosWrapper) ? this.showWatchingVideos() : this.showWatchedVideos();
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

    if (target.classList.contains('check-button')) {
      this.moveVideo($video, isWatching);
      return;
    }

    if (target.classList.contains('remove-button')) {
      this.removeVideo($video, isWatching);
    }
  }

  onNavigateWatchingVideos() {
    this.showWatchingVideos();
  }

  onNavigateWatchedVideos() {
    this.showWatchedVideos();
  }

  showWatchingVideos() {
    this.view.renderOnlyWatchingVideos();
    this.checkWhetherToShowImageNoWatching();
  }

  showWatchedVideos() {
    this.view.renderOnlyWatchedVideos();
    this.checkWhetherToShowImageNoWatched();
  }

  showImageNoVideo() {
    isWatchingMenu(this.view.$savedVideosWrapper)
      ? this.checkWhetherToShowImageNoWatching()
      : this.checkWhetherToShowImageNoWatched();
  }

  checkWhetherToShowImageNoWatching() {
    this.model.hasNoWatchingVideoSaved() && this.showImageNoWatchingVideoSaved();
  }

  checkWhetherToShowImageNoWatched() {
    this.model.hasNoWatchedVideoSaved() && this.showImageNoWatchedVideoSaved();
  }

  showImageNoWatchingVideoSaved() {
    this.view.renderImageNoWatchingVideo();
  }

  showImageNoWatchedVideoSaved() {
    this.model.hasNoWatchingVideoSaved()
      ? this.view.renderImageNoWatchingVideo()
      : this.view.renderImageNoWatchedVideo();
  }

  moveVideo($video, isWatching) {
    this.model.moveVideo($video.id);
    this.view.renderMovedVideo($video, isWatching);
    this.view.renderNotification(
      isWatching ? MESSAGE.VIDEO_IS_MOVED_TO_WATCHED_MENU : MESSAGE.VIDEO_IS_MOVED_TO_WATCHING_MENU,
    );

    this.showImageNoVideo();
  }

  removeVideo($video) {
    if (!window.confirm(MESSAGE.ARE_YOU_SURE_TO_REMOVE_VIDEO)) return;
    this.model.removeVideo($video.id);
    this.view.removeVideo($video);
    this.view.renderNotification(MESSAGE.VIDEO_IS_REMOVED_SUCCESSFULLY);
    this.showImageNoVideo();
  }
}
