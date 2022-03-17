import storage from '../storage/storage.js';
import watchedVideoInterface from '../ui/watchedVideoInterface.js';
import { $ } from '../util/general.js';
import { clearVideoItems, removeCheckedVideoItem } from '../util/render.js';
export class WatchedVideoEventHandler {
  handleWatchedVideo = () => {
    this.toggleWatchedVideoContent();
    clearVideoItems('.watched-video-item');
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
  };
}
