import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { VIDEO_PROPERTIES } from '../constants/video.js';
import { hasMissingProperty } from '../utils/validation.js';

class Video {
  #videoId = null;

  #videoTitle = null;

  #channelTitle = null;

  #publishTime = null;

  #thumbnail = null;

  #isWatched = false;

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
      isWatched: this.#isWatched,
    };
  }

  toggleWatchState() {
    this.#isWatched = !this.#isWatched;
  }

  #init({ videoId, videoTitle, channelTitle, publishTime, thumbnail, isWatched }) {
    this.#videoId = videoId;
    this.#videoTitle = videoTitle;
    this.#channelTitle = channelTitle;
    this.#publishTime = publishTime;
    this.#thumbnail = thumbnail;
    this.#isWatched = isWatched ?? false;
  }

  static create(videoInfo) {
    if (hasMissingProperty(VIDEO_PROPERTIES, videoInfo)) {
      throw new Error(ERROR_MESSAGE.VIDEO_MISSING_PROPERTY);
    }
    return new Video(videoInfo);
  }
}

export default Video;
