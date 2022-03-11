import { ERROR_MESSAGE, STORE } from '../utils/constants.js';

const storageManager = {
  keys: {
    videoId: 'videoId',
  },

  storeVideoId: function (videoId) {
    if (!this.hasVideoID(videoId)) {
      const videoList = this.getVideoIdList();
      videoList.push(videoId);
      localStorage.setItem(this.keys.videoId, JSON.stringify(videoList));
    }
  },

  getVideoIdList: function () {
    const videoList = JSON.parse(localStorage.getItem(this.keys.videoId));
    return videoList || [];
  },

  hasVideoID: function (videoId) {
    const videoList = this.getVideoIdList();
    return videoList ? videoList.includes(videoId) : false;
  },

  checkOverMaxLength: function () {
    if (this.getVideoIdList().length >= STORE.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },
};

export default storageManager;
