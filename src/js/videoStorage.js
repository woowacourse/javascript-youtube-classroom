import { ERROR_MESSAGE, STORE } from './utils/constants.js';

const videoStorage = {
  KEYS: {
    VIDEO_ID: 'videoId',
  },

  storeVideoId: function (videoId) {
    if (!this.hasVideoId(videoId)) {
      const videoList = this.getVideoIdList();
      videoList.push(videoId);
      localStorage.setItem(this.KEYS.VIDEO_ID, JSON.stringify(videoList));
    }
  },

  getVideoIdList: function () {
    const videoList = JSON.parse(localStorage.getItem(this.KEYS.VIDEO_ID));
    return videoList || [];
  },

  hasVideoId: function (videoId) {
    const videoList = this.getVideoIdList();
    return videoList.includes(videoId);
  },

  checkOverMaxLength: function () {
    if (this.getVideoIdList().length >= STORE.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },
};

export default videoStorage;
