import storage from '../storage/storage.js';
import { $, $$ } from '../util/general.js';
import { showEmptyImg, videoItemTemplate } from '../util/render.js';

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
    this.renderEmptyImg();

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
