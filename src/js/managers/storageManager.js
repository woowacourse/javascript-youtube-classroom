const storageManager = {
  keys: {
    videoId: 'videoId',
  },

  storeVideoId: function (videoId) {
    if (!this.hasVideoID(videoId)) {
      let videoList = this.getVideoIdList();
      if (!videoList) {
        videoList = [];
      }
      videoList.push(videoId);
      localStorage.setItem(this.keys.videoId, JSON.stringify(videoList));
    }
  },

  getVideoIdList: function () {
    return JSON.parse(localStorage.getItem(this.keys.videoId));
  },

  hasVideoID: function (videoId) {
    const videoList = this.getVideoIdList();
    return videoList ? videoList.includes(videoId) : false;
  },

  checkBelowMaxLength: function () {
    if (this.getVideoIdList().length >= 100) {
      throw new Error('최대 100개');
    }
  },
};

export default storageManager;
