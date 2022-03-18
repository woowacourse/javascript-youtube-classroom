import ValidationError from '../ValidationError/index.js';
import { MAX_STORE_CAPACITY, ERROR_MESSAGE } from '../constants/index.js';

const UserStorage = {
  getVideoData() {
    return JSON.parse(localStorage.getItem('video')) || [];
  },

  addVideoData(videoData) {
    const videoDataList = this.getVideoData();

    if (videoDataList.length >= MAX_STORE_CAPACITY) throw new ValidationError(ERROR_MESSAGE.EXCEED_MAX_STORE_CAPACITY);

    videoDataList.push(videoData);
    this.editVideoData(videoDataList);
  },

  editVideoData(videoDataList) {
    localStorage.setItem('video', JSON.stringify(videoDataList));
  },
};

export default UserStorage;
