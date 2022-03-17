import storage from '../storage/storage.js';
import watchLaterInterface from '../ui/watchLaterInterface.js';
import { $, confrimVideoDelete } from '../util/general.js';
import { removeCheckedVideoItem, removeDeleteVideoItem } from '../util/render.js';

export class WatchLaterVideoEventHandler {
  handleWatchLater = () => {
    this.toggleWatchLaterContent();

    watchLaterInterface.renderWatchLaterVideos();
  };
  toggleWatchLaterContent = () => {
    if ($('.watch-later-videos').classList.contains('hidden')) {
      $('.watch-later-videos').classList.toggle('hidden');
    }
    if (!$('.watched-videos').classList.contains('hidden')) {
      $('.watched-videos').classList.toggle('hidden');
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
    watchLaterInterface.renderEmptyImg();
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
      watchLaterInterface.renderEmptyImg();
    }
  };
}
