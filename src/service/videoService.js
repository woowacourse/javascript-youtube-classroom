import { SETTINGS, STORAGE_KEYWORD } from '../constants';
import storage from '../storage.js';
import validation from '../utils/validation';

const videoService = {
  isVideoCountUnderLimit() {
    const allVideoCount = storage.video.getItem().length;

    return allVideoCount < SETTINGS.MAX_SAVE_COUNT;
  },

  isVideosEmpty(storageOption = {}) {
    if (validation.isEmptyObject(storageOption)) {
      console.error('isVideosEmpty의 인자 storageOption가 빈 객체입니다.');
      return;
    }

    const videos = storage.video.getVideosBy(storageOption);

    return videos.length === 0;
  },

  pushNewVideo(dataset) {
    storage.video.pushItem(getNewVideo(dataset));
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
    [STORAGE_KEYWORD.IS_WATCHED]: false,
    [STORAGE_KEYWORD.IS_FAVORITE]: false,
  };
}

export default videoService;
