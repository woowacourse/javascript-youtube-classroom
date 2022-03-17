import storage from '../storage/storage.js';
import watchLaterInterface from '../ui/watchLaterInterface.js';
import { $ } from '../util/general.js';

export class WatchLaterVideoEventHandler {
  handleWatchLater = () => {
    this.toggleWatchLaterContent();
    watchLaterInterface.removeWatchLaterItems();
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
    watchLaterInterface.removeCheckedWatchLaterItem(
      e.target.parentElement.parentElement.dataset.videoId,
    );
  };
}
