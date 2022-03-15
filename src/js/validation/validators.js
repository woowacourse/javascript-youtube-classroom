import { ERROR_MESSAGE, MAX_SAVABLE_VIDEOS_COUNT } from '../constants/constant';
import ValidationResult from './validation-result';

const checkVideoListFull = videoList => {
  if (videoList.length === MAX_SAVABLE_VIDEOS_COUNT) {
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_SAVABLE_VIDEO_COUNT);
  }
  return new ValidationResult(false);
};

export default checkVideoListFull;
