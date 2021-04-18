import validation from "../utils/validation.js";
import ArrayStorage from "./ArrayStorage.js";

export default class VideoStorage extends ArrayStorage {
  constructor(key) {
    super(key);
  }

  popVideoByVideoId(videoId) {
    const videos = this.getItem();
    const poppedVideo = videos.find(video => video.videoId === videoId);

    if (!poppedVideo) {
      return;
    }

    this.setItem(videos.filter(video => video.videoId !== videoId));

    return poppedVideo;
  }

  setVideoProperty(targetVideoId, property = {}) {
    if (validation.isEmptyObject(property)) {
      console.error("setVideoProperty의 property 인자가 비어있습니다.");
      return;
    }

    const videos = this.getItem();
    const targetVideo = videos.filter(
      video => video.videoId === targetVideoId
    )[0];

    Object.keys(property).forEach(key => {
      if (targetVideo[key] === undefined) return;

      targetVideo[key] = property[key];
    });

    this.setItem(videos);
  }

  getVideoById(targetVideoId) {
    const videos = this.getItem();
    return videos.find(video => video.videoId === targetVideoId);
  }

  getVideosBy(storageOption = {}) {
    if (validation.isEmptyObject(storageOption)) {
      console.error("getVideosBy의 storageOption 인자가 비어있습니다.");
      return;
    }

    const videos = this.getItem();
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
  }
}
