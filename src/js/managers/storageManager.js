import validator from '../utils/validator.js';

const storageManager = {
  keys: {
    videoId: 'videoId',
  },

  storeVideoId(videoId) {
    try {
      const videoList = this.getVideoIdList();
      validator.checkOverVideoIdListMaxLength(videoList);
      const videoIdSet = new Set(videoList).add(videoId);
      localStorage.setItem(this.keys.videoId, JSON.stringify([...videoIdSet]));
    } catch (error) {
      throw error;
    }
  },

  getVideoIdList() {
    const videoList = JSON.parse(localStorage.getItem(this.keys.videoId));
    return videoList || [];
  },

  hasVideoID(videoId) {
    const videoList = this.getVideoIdList();
    return videoList && videoList.includes(videoId);
  },
};

export default storageManager;
