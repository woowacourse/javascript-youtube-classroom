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
      storedVideoList.push({ id: videoId, saw: false });
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

  getWillSeeVideoList() {
    const storedVideoList = this.getStoredVideoList();
    return storedVideoList.filter(videoData => !videoData.saw);
  },

  getSawVideoList() {
    const storedVideoList = this.getStoredVideoList();
    return storedVideoList.filter(videoData => videoData.saw);
  },

  moveToSawVideoList(videoId) {
    const storedVideoList = this.getStoredVideoList();
    storedVideoList.find(video => video.id === videoId).saw = true;
    storageUtil.setItem(this.KEY.STORED_VIDEO_LIST, storedVideoList);
  },

  moveToWillSeeVideoList(videoId) {
    const storedVideoList = this.getStoredVideoList();
    storedVideoList.find(video => video.id === videoId).saw = false;
    storageUtil.setItem(this.KEY.STORED_VIDEO_LIST, storedVideoList);
  },

  deleteVideoWithId(videoId) {
    const storedVideoList = videoStore.getStoredVideoList();
    const targetIndex = storedVideoList.findIndex(video => video.id === videoId);
    storedVideoList.splice(targetIndex, 1);
    storageUtil.setItem(this.KEY.STORED_VIDEO_LIST, storedVideoList);
  },
};

export default videoStore;
