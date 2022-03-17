import storage from '../storage/storage.js';
import { $, $$ } from '../util/general.js';
import {
  clearVideoItems,
  showEmptyImg,
  videoItemTemplate,
  removeEmptyImg,
} from '../util/render.js';

const watchLaterInterface = {
  renderEmptyImg() {
    const savedVideoData = storage.getLocalStorage();
    if (savedVideoData.length === 0) {
      showEmptyImg('.watch-later-videos-container');
      return;
    }
    const watchLaterVideos = savedVideoData.filter(item => {
      if (item.watched === false) {
        return item;
      }
    });
    if (watchLaterVideos.length === 0) {
      showEmptyImg('.watch-later-videos-container');
      return;
    }
  },
  renderWatchLaterVideos() {
    removeEmptyImg('.watch-later-videos-container .empyt-img-container');

    this.renderEmptyImg();
    clearVideoItems('.watch-later-video-item');

    const savedVideoData = storage.getLocalStorage();
    const watchLaterVideos = savedVideoData.filter(item => {
      if (item.watched === false) {
        return item;
      }
    });

    watchLaterVideos.forEach(item => {
      $('.watch-later-videos-container ul').insertAdjacentHTML(
        'beforeEnd',
        videoItemTemplate.videoItem('watch-later-video-item', item),
      );
    });
  },
};

export default watchLaterInterface;
