import { $ } from '../util/general.js';
import storage from '../storage/storage.js';
import {
  showEmptyImg,
  videoItemTemplate,
  clearVideoItems,
  removeEmptyImg,
} from '../util/render.js';

const watchedVideoInterface = {
  renderEmptyImg() {
    const savedVideoData = storage.getLocalStorage();
    if (!savedVideoData) {
      showEmptyImg('.watched-empty-img-container');
      return;
    }
    const watchedVideos = savedVideoData.filter(item => {
      if (item.watched) {
        return item;
      }
    });
    if (watchedVideos.length === 0) {
      showEmptyImg('.watched-empty-img-container');
    }
  },
  renderWatchedVideos() {
    removeEmptyImg('.watched-empty-img-container');
    this.renderEmptyImg();
    clearVideoItems('.watched-video-item');

    const savedVideoData = storage.getLocalStorage();
    if (!savedVideoData) {
      return;
    }
    const watchedVideos = savedVideoData.filter(item => {
      if (item.watched) {
        return item;
      }
    });
    watchedVideos.forEach(item => {
      $('.watched-videos-container ul').insertAdjacentHTML(
        'beforeEnd',
        videoItemTemplate.videoItem('watched-video-item', item),
      );
    });
  },
};
export default watchedVideoInterface;
