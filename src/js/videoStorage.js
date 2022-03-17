import { ERROR_MESSAGE, STORE } from './utils/constants.js';

const videoStorage = {
  KEYS: {
    VIDEO_LIST: 'videoList',
  },

  storeVideoData: function (videoData) {
    if (!this.hasVideoData(videoData.videoId)) {
      const videoList = this.getVideoDataList();
      videoList.push(videoData);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(videoList));
    }
  },

  getVideoDataList: function () {
    const videoList = JSON.parse(localStorage.getItem(this.KEYS.VIDEO_LIST));
    return videoList || [];
  },

  hasVideoData: function (videoId) {
    const videoList = this.getVideoDataList();
    return videoList.some(videoData => videoData.videoId === videoId);
  },

  checkOverMaxLength: function () {
    if (this.getVideoDataList().length >= STORE.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },

  deleteVideoData(videoId) {
    if (this.hasVideoData(videoId)) {
      const deletedList = this.getVideoDataList();
      deletedList.splice(this.getDataIndexInList(videoId), 1);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(deletedList));
    }
  },

  getDataIndexInList(videoId) {
    let dataIndex = 0;
    const videoList = this.getVideoDataList();
    videoList.forEach((videoData, idx) => {
      if (videoData.videoId === videoId) {
        dataIndex = idx;
      }
    });
    return dataIndex;
  },

  switchType(videoId) {
    const switchedList = this.getVideoDataList();
    const cutVideo = switchedList[this.getDataIndexInList(videoId)];
    cutVideo.type = cutVideo.type === 'watch-later' ? 'watched' : 'watch-later';
    this.deleteVideoData(videoId);
    localStorage.setItem(
      this.KEYS.VIDEO_LIST,
      JSON.stringify([...this.getVideoDataList(), cutVideo])
    );
  },
};

export default videoStorage;
