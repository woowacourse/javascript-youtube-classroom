import { ERROR } from '../constants/error.js';
import { MAX_SAVED_VIDEOS_NUMBER } from '../constants/conditions.js';

export const validateInput = input => {
  if (!input) {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export const validateAbleToSaveVideo = (savedVideos, saveTargetVideo) => {
  if (savedVideos.length > MAX_SAVED_VIDEOS_NUMBER) {
    throw new Error(ERROR.MESSAGE.OVER_MAX_SAVED_VIDEOS_NUMBER);
  }
  if (savedVideos.some(savedVideo => savedVideo.id === saveTargetVideo.id)) {
    throw new Error(ERROR.MESSAGE.ALREADY_SAVED_VIDEOS);
  }
};
