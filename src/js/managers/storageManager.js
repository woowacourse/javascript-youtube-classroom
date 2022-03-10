const storageManager = {
  keys: {
    videoId: 'videoId',
  },

  storeVideoId: function (videoId) {
    const videoList = this.getVideoIdList();
    if (!this.hasVideoID()) {
      localStorage.setItem(this.keys.videoId, JSON.stringify([...videoList, videoId]));
    }
  },

  getVideoIdList: function () {
    return localStorage.getItem(this.keys.videoId);
  },

  hasVideoID: function (videoId) {
    const videoList = [...this.getVideoIdList()];
    return videoList.includes(videoId);
  },
};

export default storageManager;
