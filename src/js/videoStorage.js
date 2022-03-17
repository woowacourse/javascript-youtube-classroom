import { ERROR_MESSAGE, STORE } from './utils/constants.js';

const videoStorage = {
  KEYS: {
    VIDEO_LIST: 'videoList',
  },

  storeVideoId: function (videoData) {
    if (!this.hasVideoId(videoData)) {
      const videoList = this.getVideoIdList();
      videoList.push(videoData);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(videoList));
    }
  },

  getVideoIdList: function () {
    const videoList = JSON.parse(localStorage.getItem(this.KEYS.VIDEO_LIST));
    return videoList || [];
  },

  hasVideoId: function (videoId) {
    const videoList = this.getVideoIdList();
    return videoList.some(videoData => videoData.videoId === videoId);
  },

  checkOverMaxLength: function () {
    if (this.getVideoIdList().length >= STORE.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },
};

export default videoStorage;
