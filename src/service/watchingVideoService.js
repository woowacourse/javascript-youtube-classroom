import { SETTINGS } from '../constants';
import { watchedVideoStorage, watchingVideoStorage } from '../store.js';

const watchingVideoService = {
  isVideoCountUnderLimit() {
    const allVideoCount =
      watchingVideoStorage.getItem().length +
      watchedVideoStorage.getItem().length;

    return allVideoCount < SETTINGS.MAX_SAVE_COUNT;
  },

  isVideosEmpty() {
    return watchingVideoStorage.getItem().length === 0;
  },

  pushNewVideo(dataset) {
    watchingVideoStorage.pushItem(getNewVideo(dataset));
  },
};

function getNewVideo(dataset) {
  return {
    title: dataset.title,
    channelTitle: dataset.channelTitle,
    publishedAt: dataset.publishedAt,
    videoId: dataset.videoId,
    thumbnailUrl: dataset.thumbnailUrl,
    isSaved: true,
  };
}

export default watchingVideoService;
