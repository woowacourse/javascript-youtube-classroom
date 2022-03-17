import ValidationError from '../ValidationError/index.js';
import { MAX_STORE_CAPACITY, ERROR_MESSAGE } from '../constants/index.js';

const UserStorage = {
  getVideoIds() {
    return JSON.parse(localStorage.getItem('videoIds')) || [];
  },

  addVideoId(videoId) {
    const videoIds = this.getVideoIds();

    if (videoIds.length >= MAX_STORE_CAPACITY)
      throw new ValidationError(ERROR_MESSAGE.EXCEED_MAX_STORE_CAPACITY);

    videoIds.push(videoId);
    localStorage.setItem('videoIds', JSON.stringify(videoIds));
  },
};

export default UserStorage;
