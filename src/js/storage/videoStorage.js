import {
  ERROR_MESSAGE,
  LOCAL_STORAGE_VIDEO_LIST_KEY,
  MAX_SAVABLE_VIDEOS_COUNT,
} from '../constants/constant';
import ValidationError from '../validation/validation-error';
import LocalStorage from './localStorage';

class VideoStorage extends LocalStorage {
  constructor() {
    super(LOCAL_STORAGE_VIDEO_LIST_KEY);
    this.cache = this.load({});
  }

  saveVideo(videoId) {
    if (Object.keys(this.cache).length === MAX_SAVABLE_VIDEOS_COUNT) {
      throw new ValidationError(ERROR_MESSAGE.OVER_MAX_SAVABLE_VIDEO_COUNT);
    }
    this.cache[videoId] = { watched: false };
    this.save(this.cache);
  }

  toggleWatchStatus(videoId) {
    this.cache[videoId] = { watched: !this.cache[videoId].watched };
    this.save(this.cache);
  }

  removeVideo(videoId) {
    delete this.cache[videoId];
    this.save(this.cache);
  }

  clear() {
    this.cache = {};
    this.save({});
  }
}

export default VideoStorage;
