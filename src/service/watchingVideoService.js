import { SETTINGS } from '../constants';
import { watchedVideoModel, watchingVideoModel } from '../store.js';

const watchingVideoService = {
  isVideoCountUnderLimit() {
    const allVideoCount =
      watchingVideoModel.getItem().length + watchedVideoModel.getItem().length;

    return allVideoCount < SETTINGS.MAX_SAVE_COUNT;
  },

  isVideosEmpty() {
    return watchingVideoModel.getItem().length === 0;
  },

  pushNewVideo(dataset) {
    watchingVideoModel.pushItem(getNewVideo(dataset));
  },

};

function getNewVideo(dataset) {
  return {
    title: dataset.title,
    channelTitle: dataset.channelTitle,
    publishedAt: dataset.publishedAt,
    videoId: dataset.videoId,
    isSaved: true,
  };
}

export default watchingVideoService;
