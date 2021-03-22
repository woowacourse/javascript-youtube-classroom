import {
  isWatchingMenu,
  isWatchedMenu,
  isLikedMenu,
  isWatchingVideo,
  isLikedVideo,
  isConfirmCancelButton,
  isConfirmApproveButton,
} from './elementValidator.js';
import { MESSAGE } from '../constants.js';

export default class StorageController {
  constructor({ storageModel, storageView }) {
    this.view = storageView;
    this.model = storageModel;
  }

  init() {
    this.showStorage();
    this.attachEvents();
  }

  attachEvents() {
    this.view.$storageSection.addEventListener('click', this.onRequestVideoManagement.bind(this));
    this.view.$watchingMenuButton.addEventListener('click', this.onNavigateWatchingVideos.bind(this));
    this.view.$watchedMenuButton.addEventListener('click', this.onNavigateWatchedVideos.bind(this));
    this.view.$likedMenuButton.addEventListener('click', this.onNavigateLikedVideos.bind(this));
    this.view.$removalConfirm.addEventListener('click', this.onConfirmRemoval.bind(this));
  }

  onRequestVideoManagement({ target }) {
    if (!target.classList.contains('video-manage-btn')) {
      return;
    }

    this.model.targetVideo = target.closest('article');

    if (target.classList.contains('js-check-button')) {
      this.proceedSwitchingWatchFlag();
      return;
    }

    if (target.classList.contains('js-like-button')) {
      this.proceedSwitchingLikeFlag();
      return;
    }

    if (target.classList.contains('js-remove-button')) {
      this.view.renderVisibleRemovalConfirm(MESSAGE.ARE_YOU_SURE_TO_REMOVE_VIDEO);
    }
  }

  proceedSwitchingWatchFlag() {
    const $video = this.model.targetVideo;
    const isWatching = isWatchingVideo($video);
    const message = isWatching ? MESSAGE.VIDEO_IS_MOVED_TO_WATCHED_MENU : MESSAGE.VIDEO_IS_MOVED_TO_WATCHING_MENU;

    try {
      this.model.switchWatchFlag();
      this.view.renderWatchFlagSwitchedVideo($video, isWatching);
      this.view.renderNotification(message);
      this.showImageNoVideo();
    } catch (error) {
      this.view.renderNotification(MESSAGE.REQUEST_HAS_FAILED);
    }
  }

  proceedSwitchingLikeFlag() {
    const $video = this.model.targetVideo;
    const isLiked = isLikedVideo($video);
    const message = isLiked ? MESSAGE.VIDEO_IS_REMOVED_FROM_LIKED_MENU : MESSAGE.VIDEO_IS_ADDED_TO_LIKED_MENU;

    try {
      this.model.switchLikeFlag();
      this.view.renderLikeFlagSwitchedVideo($video, isLiked);
      this.view.renderNotification(message);
      this.showImageNoVideo();
    } catch (error) {
      this.view.renderNotification(MESSAGE.REQUEST_HAS_FAILED);
    }
  }

  onConfirmRemoval({ target }) {
    if (isConfirmCancelButton(target)) {
      this.view.renderInvisibleRemovalConfirm();
      return;
    }

    if (!isConfirmApproveButton(target)) {
      return;
    }

    this.proceedRemovingVideo();
  }

  proceedRemovingVideo() {
    this.view.renderInvisibleRemovalConfirm();

    const $video = this.model.targetVideo;
    const isWatching = isWatchingVideo($video);

    this.model.removeVideo($video.id, isWatching);
    this.view.removeVideo($video);
    this.view.renderNotification(MESSAGE.VIDEO_IS_REMOVED_SUCCESSFULLY);
    this.showImageNoVideo();
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

  showStorage() {
    this.view.renderVideosToPrepare(this.model.videos);

    if (isLikedMenu(this.view.$storageSection)) {
      this.showLikedVideos();
      return;
    }

    if (isWatchedMenu(this.view.$storageSection)) {
      this.showWatchedVideos();
      return;
    }

    this.showWatchingVideos();
  }

  showWatchingVideos() {
    this.view.renderOnlyWatchingVideos();
    this.showImageNoWatchingVideo();
  }

  showWatchedVideos() {
    this.view.renderOnlyWatchedVideos();
    this.showImageNoWatchedVideo();
  }

  showLikedVideos() {
    this.view.renderOnlyLikedVideos();
    this.showImageNoLikedVideo();
  }

  showImageNoVideo() {
    if (isWatchingMenu(this.view.$storageSection)) {
      this.showImageNoWatchingVideo();
      return;
    }

    if (isWatchedMenu(this.view.$storageSection)) {
      this.showImageNoWatchedVideo();
      return;
    }

    this.showImageNoLikedVideo();
  }

  showImageNoWatchingVideo() {
    if (this.model.watchingVideoCount > 0) {
      return;
    }

    this.view.renderImageNoWatchingVideo();
  }

  showImageNoWatchedVideo() {
    if (this.model.watchedVideoCount > 0) {
      return;
    }

    if (this.model.watchingVideoCount === 0) {
      this.view.renderImageNoWatchingVideo();
    } else {
      this.view.renderImageNoWatchedVideo();
    }
  }

  showImageNoLikedVideo() {
    if (this.model.likedVideoCount > 0) {
      return;
    }

    this.view.renderImageNoLikedVideo();
  }
}
