import { ERROR_MESSAGE } from '../constants';
import { findVideoInVideoInfoList } from '../utils/util';
const SAVED_VIDEO_LIST_KEY = 'saved-video-list';
export default {
  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setSavedVideoList(saveVideo) {
    const currentData = this.getData(SAVED_VIDEO_LIST_KEY) ?? [];

    if (currentData.length === 100) {
      throw new Error(ERROR_MESSAGE.SAVE_VIDEO_COUNT_OVER);
    }
    if (findVideoInVideoInfoList(currentData, saveVideo.videoId)) {
      throw new Error(ERROR_MESSAGE.ALREADY_SAVED_VIDEO);
    }
    localStorage.setItem(SAVED_VIDEO_LIST_KEY, JSON.stringify([...currentData, saveVideo]));
  },
  // clear 하는 함수가 있으면 좋을 것 같다..?
};
