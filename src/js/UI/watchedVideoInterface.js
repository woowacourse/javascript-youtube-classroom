import { $, $$ } from '../util/general.js';
import storage from '../storage/storage.js';
import { videoItemTemplate } from '../util/render.js';

const watchedVideoInterface = {
  renderWatchedVideos() {
    const savedVideoData = storage.getLocalStorage();
    if (!savedVideoData) {
      return;
    }
    savedVideoData.forEach(item => {
      if (item.watched) {
        $('.watched-videos-container ul').insertAdjacentHTML(
          'beforeEnd',
          videoItemTemplate.videoItem('watched-video-item', item),
        );
      }
    });
  },
};
export default watchedVideoInterface;
