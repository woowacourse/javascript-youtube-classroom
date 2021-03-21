import VideoSaveManager from '../manager/VideoSaveManager.js';
import { isWatchingMenu, isWatchingVideo, isLikedVideo, isLikedMenu } from './elementValidator.js';
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
    this.view.$likedMenuButton.addEventListener('click', this.onNavigateLikedVideos.bind(this));
  }

  onRequestVideoManagement({ target }) {
    if (!target.classList.contains('video-manage-btn')) {
      return;
    }

    const $video = target.closest('article');
    const isWatching = isWatchingVideo($video);
    const isLiked = isLikedVideo($video);

    if (target.classList.contains('check-button')) {
      this.toggleWatchingVideo($video, isWatching);
      return;
    }

    if (target.classList.contains('remove-button')) {
      this.removeVideo($video);
    }

    if (target.classList.contains('like-button')) {
      this.toggleLikedVideo($video, isLiked);
    }
  }

  onNavigateWatchingVideos() {
    this.showWatchingVideos();
  }

  onNavigateWatchedVideos() {
    this.showWatchedVideos();
  }

  onNavigateLikedVideos() {
    this.showLikedVideos();
  }

  showWatchingVideos() {
    this.view.renderOnlyWatchingVideos();
    this.checkWhetherToShowImageNoWatching();
  }

  showWatchedVideos() {
    this.view.renderOnlyWatchedVideos();
    this.checkWhetherToShowImageNoWatched();
  }

  showLikedVideos() {
    this.view.renderOnlyLikedVideos();
    this.showImageNoLikedVideoSaved();
  }

  showImageNoVideo() {
    if (isLikedMenu(this.view.$savedVideosWrapper)) {
      this.checkWhetherToShowImageNoLiked();

      return;
    }

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

  checkWhetherToShowImageNoLiked() {
    console.log(this.model.likedVideoCount);
    this.model.hasNoLikedVideoSaved() && this.showImageNoLikedVideoSaved();
  }

  showImageNoWatchingVideoSaved() {
    this.view.renderImageNoWatchingVideo();
  }

  showImageNoWatchedVideoSaved() {
    this.model.hasNoWatchingVideoSaved()
      ? this.view.renderImageNoWatchingVideo()
      : this.view.renderImageNoWatchedVideo();
  }

  showImageNoLikedVideoSaved() {
    this.model.hasNoWatchingVideoSaved() ? this.view.renderImageNoWatchingVideo() : this.view.renderImageNoLikedVideo();
  }

  toggleWatchingVideo($video, isWatching) {
    this.model.toggleWatchingVideo($video.id);
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

  toggleLikedVideo($video, isLiked) {
    this.model.toggleLikedVideo($video.id);
    this.view.renderToggleLikedVideo($video);
    this.view.renderNotification(isLiked ? MESSAGE.UNCHECK_LIKE_BUTTON : MESSAGE.CHECK_LIKE_BUTTON);
    isLikedMenu(this.view.$savedVideosWrapper) && this.checkWhetherToShowImageNoLiked();
  }
}
