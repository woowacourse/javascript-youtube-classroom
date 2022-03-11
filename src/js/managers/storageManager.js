const storageManager = {
  keys: {
    videoId: 'videoId',
  },

  storeVideoId: function (videoId) {
    if (!this.hasVideoID(videoId)) {
      const videoList = this.getVideoIdList();
      videoList.push(videoId);
      localStorage.setItem(this.keys.videoId, JSON.stringify(videoList));
    }
  },

  getVideoIdList: function () {
    const videoList = JSON.parse(localStorage.getItem(this.keys.videoId));
    return videoList || [];
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
