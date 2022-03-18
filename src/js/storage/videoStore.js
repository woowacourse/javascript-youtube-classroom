import validator from '../utils/validator.js';
import storageUtil from './storageUtil.js';
import { STORE } from '../utils/constants.js';

const videoStore = {
  KEY: {
    STORED_VIDEO_LIST: 'storedVideoList',
  },

  storeVideoWithVideoId(videoId) {
    try {
      const storedVideoList = this.getStoredVideoList();
      validator.checkStoredVideoListOverMaxLength(storedVideoList);
      storedVideoList.push({ id: videoId, storeType: STORE.WILL_SEE });
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

  getVideoListWith(storeType) {
    const storedVideoList = this.getStoredVideoList();
    return storedVideoList.filter(videoData => videoData.storeType === storeType);
  },

  changeVideoStoreType(videoId, storeType) {
    const storedVideoList = this.getStoredVideoList();
    const changedStoreType = storeType === STORE.WILL_SEE ? STORE.SAW : STORE.WILL_SEE;
    storedVideoList.find(video => video.id === videoId).storeType = changedStoreType;
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
