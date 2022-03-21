import { ERROR_MESSAGE, STORE, VIDEO_TYPE } from './utils/constants.js';

const videoStorage = {
  KEYS: {
    VIDEO_LIST: 'videoList',
  },

  storeVideo: function (videoData) {
    if (!this.hasVideo(videoData.videoId)) {
      const videoList = this.getVideoList();
      videoList.push(videoData);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(videoList));
    }
  },

  getVideoList: function () {
    const videoList = JSON.parse(localStorage.getItem(this.KEYS.VIDEO_LIST));
    return videoList || [];
  },

  hasVideo: function (videoId) {
    const videoList = this.getVideoList();
    return videoList.some(videoData => videoData.videoId === videoId);
  },

  checkOverMaxLength: function () {
    if (this.getVideoList().length >= STORE.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_MAX_STORE_LENGTH);
    }
  },

  deleteVideo(videoId) {
    if (this.hasVideo(videoId)) {
      const deletedList = this.getVideoList();
      deletedList.splice(this.findVideoIndex(videoId), 1);
      localStorage.setItem(this.KEYS.VIDEO_LIST, JSON.stringify(deletedList));
    }
  },

  findVideoIndex(videoId) {
    return this.getVideoList().findIndex(videoData => videoData.videoId === videoId);
  },

  swtichVideoType(videoId) {
    const selectedVideoIndex = this.findVideoIndex(videoId);
    const selectedVideo = this.getVideoList()[selectedVideoIndex];
    selectedVideo.type =
      selectedVideo.type === VIDEO_TYPE.WATCH_LATER ? VIDEO_TYPE.WATCHED : VIDEO_TYPE.WATCH_LATER;

    this.deleteVideo(videoId);

    localStorage.setItem(
      this.KEYS.VIDEO_LIST,
      JSON.stringify([...this.getVideoList(), selectedVideo])
    );
  },
};

export default videoStorage;
