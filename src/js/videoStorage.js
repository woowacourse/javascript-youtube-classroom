import { ERROR_MESSAGE, STORE, VIDEO_TYPE } from './utils/constants.js';

const videoStorage = {
  KEYS: {
    VIDEO_LIST: 'videoList',
  },

  savedVideoList: JSON.parse(localStorage.getItem('videoList')) || [],

  storeVideo: function (videoData) {
    if (!this.hasVideo(videoData.videoId)) {
      this.savedVideoList.push(videoData);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(this.savedVideoList));
    }
  },

  hasVideo: function (videoId) {
    return this.savedVideoList.some(videoData => videoData.videoId === videoId);
  },

  checkOverMaxLength: function () {
    if (this.savedVideoList.length >= STORE.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },

  deleteVideo(videoId) {
    if (this.hasVideo(videoId)) {
      this.savedVideoList.splice(this.findVideoIndex(videoId), 1);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(this.savedVideoList));
    }
  },

  findVideoIndex(videoId) {
    return this.savedVideoList.findIndex(videoData => videoData.videoId === videoId);
  },

  swtichVideoType(videoId) {
    const selectedVideoIndex = this.findVideoIndex(videoId);
    const selectedVideo = this.savedVideoList[selectedVideoIndex];
    selectedVideo.type =
      selectedVideo.type === VIDEO_TYPE.WATCH_LATER ? VIDEO_TYPE.WATCHED : VIDEO_TYPE.WATCH_LATER;
    this.deleteVideo(videoId);
    const newVideoList = [...this.savedVideoList, selectedVideo];

    this.savedVideoList = newVideoList;
    localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(newVideoList));
  },
};

export default videoStorage;
