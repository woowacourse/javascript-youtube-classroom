import { ERROR_MESSAGE } from '../constants/index.js';
import { VIDEO_PROPERTY } from '../constants/video.js';
import { isMissingProperty } from '../utils/validation.js';

class Video {
  #videoId = null;

  #videoTitle = null;

  #channelTitle = null;

  #publishTime = null;

  #thumbnail = null;

  constructor(videoInfo) {
    this.#init(videoInfo);
  }

  getVideoInfo() {
    return {
      videoId: this.#videoId,
      videoTitle: this.#videoTitle,
      channelTitle: this.#channelTitle,
      publishTime: this.#publishTime,
      thumbnail: this.#thumbnail,
    };
  }

  #init({ videoId, videoTitle, channelTitle, publishTime, thumbnail }) {
    this.#videoId = videoId;
    this.#videoTitle = videoTitle;
    this.#channelTitle = channelTitle;
    this.#publishTime = publishTime;
    this.#thumbnail = thumbnail;
  }

  static create(videoInfo) {
    if (isMissingProperty(VIDEO_PROPERTY, videoInfo)) {
      throw new Error(ERROR_MESSAGE.VIDEO_MISSING_PROPERTY);
    }
    return new Video(videoInfo);
  }
}

export default Video;
