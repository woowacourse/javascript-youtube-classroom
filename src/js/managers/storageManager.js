import validator from '../utils/validator.js';

const storageManager = {
  KEY: {
    VIDEO_ID_LIST: 'videoId',
  },

  storeVideoId(videoId) {
    try {
      const videoIdList = this.getVideoIdList();
      validator.checkOverVideoIdListMaxLength(videoIdList);
      const videoIdSet = new Set(videoIdList).add(videoId);
      localStorage.setItem(this.KEY.VIDEO_ID_LIST, JSON.stringify([...videoIdSet]));
    } catch (error) {
      throw error;
    }
  },

  getVideoIdList() {
    const videoIdList = JSON.parse(localStorage.getItem(this.KEY.VIDEO_ID_LIST));
    return videoIdList || [];
  },

  hasVideoID(videoId) {
    const videoIdList = this.getVideoIdList();
    return videoIdList && videoIdList.includes(videoId);
  },
};

export default storageManager;
