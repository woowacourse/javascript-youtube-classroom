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

  setVideoProperty(targetVideoId, property = {}) {
    if (validation.isEmptyObject(property)) {
      console.error("setVideoProperty의 property 인자가 비어있습니다.");
      return;
    }

    const videos = videoStorage.getItem();
    const targetVideo = videos.filter(
      video => video.videoId === targetVideoId
    )[0];

    Object.keys(property).forEach(key => {
      if (targetVideo[key] === undefined) return;

      targetVideo[key] = property[key];
    });

    videoStorage.setItem(videos);
  },

  getVideoById(targetVideoId) {
    const videos = videoStorage.getItem();

    return videos.find(video => video.videoId === targetVideoId);
  },

  getVideosBy(storageOption = {}) {
    if (validation.isEmptyObject(storageOption)) {
      console.error("getVideosBy의 storageOption 인자가 비어있습니다.");
      return;
    }

    const videos = videoStorage.getItem();
    const isSatisfiedByOption = video => {
      const keys = Object.keys(storageOption);

      return keys.every(key => {
        if (video[key] === undefined) {
          console.error(
            `getVideosBy의 인자가 유효하지 않은 key값입니다.(key: ${key})`
          );

          return false;
        }

        return video[key] === storageOption[key];
      });
    };

    return videos.filter(isSatisfiedByOption);
  },

  getAllVideoCount() {
    return videoStorage.getItem().length;
  },

  popVideoById(videoId) {
    const videos = videoStorage.getItem();
    const poppedVideo = videos.find(video => video.videoId === videoId);

    if (!poppedVideo) {
      return;
    }

    videoStorage.setItem(videos.filter(video => video.videoId !== videoId));

    return poppedVideo;
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
