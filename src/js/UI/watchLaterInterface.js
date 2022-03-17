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
          videoItemTemplate.videoItem(item),
        );
      }
    });
  },
  removeWatchLaterItems() {
    $$('.watch-later-video-item').forEach(element => element.remove());
  },
  removeCheckedWatchLaterItem(videoId) {
    $$('.watch-later-video-item').forEach(element => {
      if (element.dataset.videoId === videoId) {
        element.remove();
      }
    });
  },
  removeDeleteVideoItem(videoId) {
    $$('.watch-later-video-item').forEach(element => {
      if (element.dataset.videoId === videoId) {
        element.remove();
      }
    });
  },
};

export default watchLaterInterface;
