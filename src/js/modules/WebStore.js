import { findVideoInVideoInfoList } from '../utils/util';

// singleton
export default {
  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setSavedVideoList(saveVideo) {
    const currentData = this.getData('saved-video-list') ?? [];
    if (currentData.length === 100) {
      throw new Error('100개까지만 저장이 가능합니다.');
    }
    if (findVideoInVideoInfoList(currentData, saveVideo.videoId)) {
      throw new Error('이미 저장한 비디오입니다.');
    }
    localStorage.setItem('saved-video-list', JSON.stringify([...currentData, saveVideo]));
  },

  // clear 하는 함수가 있으면 좋을 것 같다..?
};
