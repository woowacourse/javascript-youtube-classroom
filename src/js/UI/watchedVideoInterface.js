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
    if (savedVideoData.length === 0) {
      showEmptyImg('.watched-videos-container');
      return;
    }
    const watchedVideos = savedVideoData.filter(item => {
      if (item.watched) {
        return item;
      }
    });
    if (watchedVideos.length === 0) {
      showEmptyImg('.watched-videos-container');
    }
  },
  renderWatchedVideos() {
    removeEmptyImg('.watched-videos-container .empyt-img-container');
    this.renderEmptyImg();
    clearVideoItems('.watched-video-item');

    const savedVideoData = storage.getLocalStorage();
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
