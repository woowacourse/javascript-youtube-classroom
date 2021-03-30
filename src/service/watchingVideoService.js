import { SETTINGS } from '../constants';
import storage from '../storage.js';

const watchingVideoService = {
  isVideoCountUnderLimit() {
    const allVideoCount =
      storage.watchingVideo.getItem().length +
      storage.watchedVideo.getItem().length;

    return allVideoCount < SETTINGS.MAX_SAVE_COUNT;
  },

  isVideosEmpty() {
    return storage.watchingVideo.getItem().length === 0;
  },

  pushNewVideo(dataset) {
    storage.watchingVideo.pushItem(getNewVideo(dataset));
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
