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
}
