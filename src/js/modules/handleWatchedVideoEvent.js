import storage from '../storage/storage.js';
import watchedVideoInterface from '../ui/watchedVideoInterface.js';
import { $, confrimVideoDelete } from '../util/general.js';
import { removeCheckedVideoItem, removeDeleteVideoItem } from '../util/render.js';
export class WatchedVideoEventHandler {
  handleWatchedVideo = () => {
    this.toggleWatchedVideoContent();

    watchedVideoInterface.renderWatchedVideos();
  };

  toggleWatchedVideoContent = () => {
    if (!$('.watch-later-videos').classList.contains('hidden')) {
      $('.watch-later-videos').classList.toggle('hidden');
    }
    if ($('.watched-videos').classList.contains('hidden')) {
      $('.watched-videos').classList.toggle('hidden');
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
    watchedVideoInterface.renderEmptyImg();
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
      watchedVideoInterface.renderEmptyImg();
    }
  };
}
