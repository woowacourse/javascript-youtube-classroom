import storage from '../storage.js';

const watchedVideoService = {
  isVideosEmpty() {
    return storage.watchedVideo.getItem().length === 0;
  },
};

export default watchedVideoService;
