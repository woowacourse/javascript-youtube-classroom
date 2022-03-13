import validator from '../utils/validator.js';

const storageManager = {
  keys: {
    videoIdList: 'videoId',
  },

  storeVideoId(videoId) {
    try {
      const videoIdList = this.getVideoIdList();
      validator.checkOverVideoIdListMaxLength(videoIdList);
      const videoIdSet = new Set(videoIdList).add(videoId);
      localStorage.setItem(this.keys.videoIdList, JSON.stringify([...videoIdSet]));
    } catch (error) {
      throw error;
    }
  },

  getVideoIdList() {
    const videoIdList = JSON.parse(localStorage.getItem(this.keys.videoIdList));
    return videoIdList || [];
  },

  hasVideoID(videoId) {
    const videoIdList = this.getVideoIdList();
    return videoIdList && videoIdList.includes(videoId);
  },
};

export default storageManager;
