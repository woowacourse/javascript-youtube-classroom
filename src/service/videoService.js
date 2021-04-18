import { SETTINGS, STORAGE_KEYWORD } from "../constants";
import { videoStorage } from "../storage/";
import validation from "../utils/validation";

const videoService = {
  isVideoCountUnderLimit() {
    const allVideoCount = videoStorage.getItem().length;

    return allVideoCount < SETTINGS.MAX_SAVE_COUNT;
  },

  isVideosEmpty(storageOption = {}) {
    if (validation.isEmptyObject(storageOption)) {
      console.error("isVideosEmpty의 인자 storageOption가 빈 객체입니다.");
      return;
    }

    const videos = videoStorage.getVideosBy(storageOption);

    return videos.length === 0;
  },

  pushNewVideo(dataset) {
    videoStorage.pushItem(getNewVideo(dataset));
  },
};

function getNewVideo(dataset) {
  return {
    ...dataset,
    isSaved: true,
    [STORAGE_KEYWORD.IS_WATCHED]: false,
    [STORAGE_KEYWORD.IS_FAVORITE]: false,
  };
}

export default videoService;
