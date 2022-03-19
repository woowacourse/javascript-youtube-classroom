import { ERROR_MESSAGE } from '../constants/constant';
import ValidationError from '../validation/validation-error';
import LocalStorage from './localStorage';

class VideoStorage extends LocalStorage {
  constructor(key, maxCount) {
    super(key);
    this.maxCount = maxCount;
    this.cache = this.load({});
  }

  saveVideo(videoId) {
    const videoSet = this.load({});
    if (Object.keys(videoSet).length === this.maxCount) {
      throw new ValidationError(ERROR_MESSAGE.OVER_MAX_SAVABLE_VIDEO_COUNT);
    }
    videoSet[videoId] = { watched: false };
    this.save(videoSet);
    this.cache = videoSet;
  }
}

export default VideoStorage;
