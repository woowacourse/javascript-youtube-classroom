import storage from '../storage/storage.js';
import { $, $$ } from '../util/general.js';
import { videoItemTemplate } from '../util/render.js';

const watchLaterInterface = {
  renderWatchLaterVideos() {
    const savedVideoData = storage.getLocalStorage();
    if (!savedVideoData) {
      return;
    }
    savedVideoData.forEach(item => {
      if (item.watched === false) {
        $('.watch-later-videos-container ul').insertAdjacentHTML(
          'beforeEnd',
          videoItemTemplate.videoItem('watch-later-video-item', item),
        );
      }
    });
  },
};

export default watchLaterInterface;
