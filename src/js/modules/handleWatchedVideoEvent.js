import { SNACK_BAR } from '../constants/constants.js';
import storage from '../storage/storage.js';
import watchedVideoView from '../ui/watchedVideoView.js';
import { $, checkHasHiddenClass, confrimVideoDelete, toggleSnackBar } from '../util/general.js';
import { removeCheckedVideoItem, removeDeleteVideoItem } from '../util/render.js';
export class WatchedVideoEventHandler {
  handleWatchedVideo = () => {
    this.toggleWatchedVideoContent();

    watchedVideoView.renderWatchedVideos();
  };

  toggleWatchedVideoContent = () => {
    if (!checkHasHiddenClass('.watch-later-videos')) {
      $('.watch-later-videos').classList.toggle('hidden');
      $('.watch-later-nav-button').classList.toggle('is-active');
    }
    if (checkHasHiddenClass('.watched-videos')) {
      $('.watched-videos').classList.toggle('hidden');
      $('.watched-nav-button').classList.toggle('is-active');
    }
  };

  handledWatchedButtonClick = e => {
    if (!e.target.classList.contains('video-item__watched-button')) {
      return;
    }
    storage.toggleWatchedVideo(e.target.parentElement.parentElement.dataset.videoId);
    removeCheckedVideoItem(
      '.watched-video-item',
      e.target.parentElement.parentElement.dataset.videoId,
    );
    watchedVideoView.renderEmptyImg();
    toggleSnackBar(SNACK_BAR.WATCH_LATER_MESSAGE);
  };

  handleDeleteButtonClick = e => {
    if (!e.target.classList.contains('video-item__delete-button')) {
      return;
    }
    if (confrimVideoDelete()) {
      storage.deleteSavedVideo(e.target.parentElement.parentElement.dataset.videoId);
      removeDeleteVideoItem(
        '.watched-video-item',
        e.target.parentElement.parentElement.dataset.videoId,
      );
      watchedVideoView.renderEmptyImg();
      toggleSnackBar(SNACK_BAR.DELETE_MESSAGE);
    }
  };
}
