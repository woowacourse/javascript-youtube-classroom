import { SNACK_BAR } from '../constants/constants.js';
import storage from '../storage/storage.js';
import watchLaterView from '../ui/watchLaterView.js';
import { $, checkHasHiddenClass, confrimVideoDelete, toggleSnackBar } from '../util/general.js';
import { removeCheckedVideoItem, removeDeleteVideoItem } from '../util/render.js';

export class WatchLaterVideoEventHandler {
  handleWatchLater = () => {
    this.toggleWatchLaterContent();

    watchLaterView.renderWatchLaterVideos();
  };
  toggleWatchLaterContent = () => {
    if (checkHasHiddenClass('.watch-later-videos')) {
      $('.watch-later-videos').classList.toggle('hidden');
      $('.watch-later-nav-button').classList.toggle('is-active');
    }
    if (!checkHasHiddenClass('.watched-videos')) {
      $('.watched-videos').classList.toggle('hidden');
      $('.watched-nav-button').classList.toggle('is-active');
    }
  };
  handleWatchedButtonClick = e => {
    if (!e.target.classList.contains('video-item__watched-button')) {
      return;
    }
    storage.toggleWatchedVideo(e.target.parentElement.parentElement.dataset.videoId);
    removeCheckedVideoItem(
      '.watch-later-video-item',
      e.target.parentElement.parentElement.dataset.videoId,
    );
    watchLaterView.renderEmptyImg();
    toggleSnackBar(SNACK_BAR.WATCHED_MESSAGE);
  };
  handleDeleteButtonClick = e => {
    if (!e.target.classList.contains('video-item__delete-button')) {
      return;
    }
    if (confrimVideoDelete()) {
      storage.deleteSavedVideo(e.target.parentElement.parentElement.dataset.videoId);
      removeDeleteVideoItem(
        '.watch-later-video-item',
        e.target.parentElement.parentElement.dataset.videoId,
      );
      watchLaterView.renderEmptyImg();
      toggleSnackBar(SNACK_BAR.DELETE_MESSAGE);
    }
  };
}
