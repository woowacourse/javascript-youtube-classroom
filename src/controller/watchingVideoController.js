import { watchingVideoModel } from '../store';
import {
  watchingVideoView,
} from '../view';
import watchingVideoService from '../service/watchingVideoService.js';

const watchingVideoController = {
  loadWatchingVideos() {
    const watchingVideos = watchingVideoModel.getItem();
    if (watchingVideoService.isVideosEmpty()) {
      watchingVideoView.showEmptyVideoImage();
    }
    watchingVideoView.renderVideos(watchingVideos);
  }
};

export default watchingVideoController;
