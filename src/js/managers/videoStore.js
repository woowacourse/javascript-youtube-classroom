import validator from '../utils/validator.js';
import storageUtil from './storageUtil.js';

const videoStore = {
  KEY: {
    STORED_VIDEO_LIST: 'storedVideoList',
  },

  storeVideoWithVideoId(videoId) {
    try {
      const storedVideoList = this.getStoredVideoList();
      validator.checkStoredVideoListOverMaxLength(storedVideoList);
      storedVideoList.push({ id: videoId, seen: false });
      storageUtil.setItem(this.KEY.STORED_VIDEO_LIST, storedVideoList);
    } catch (error) {
      throw error;
    }
  },

  getStoredVideoList() {
    return storageUtil.getItem(this.KEY.STORED_VIDEO_LIST) ?? [];
  },

  hasVideoId(videoId) {
    const storedVideoList = this.getStoredVideoList();
    return storedVideoList.some(storedVideo => storedVideo.id === videoId);
  },
};

export default videoStore;
