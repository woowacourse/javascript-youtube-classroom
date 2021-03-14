import { LOCAL_STORAGE_KEY } from '../constants.js';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage.js';

const videoToWatch = {
  getVideos() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH) || [];
  },

  setVideos(videos) {
    if (!Array.isArray(videos)) {
      return;
    }
    setLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH, videos);
  },

  pushVideo(newVideo) {
    const videosToWatch = videoToWatch.getVideos();
    videosToWatch.push(newVideo);
    videoToWatch.setVideos(videosToWatch);
  },

};

export default videoToWatch;
