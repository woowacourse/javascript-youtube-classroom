import { watchedVideoModel } from '../store';

const watchedVideoService = {
  isVideosEmpty() {
    return watchedVideoModel.getItem().length === 0;
  },
};

export default watchedVideoService;
