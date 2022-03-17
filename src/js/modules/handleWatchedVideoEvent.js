import watchedVideoInterface from '../ui/watchedVideoInterface.js';
import { $ } from '../util/general.js';

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
}
