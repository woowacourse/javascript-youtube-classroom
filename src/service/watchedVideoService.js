import { watchedVideoStorage } from '../store';

const watchedVideoService = {
  isVideosEmpty() {
    return watchedVideoStorage.getItem().length === 0;
  },
};

export default watchedVideoService;
