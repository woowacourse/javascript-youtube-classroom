const state = {
  videoInfos: new Set(),
  addVideoInfo(newVideoInfo) {
    this.videoInfos.add(newVideoInfo);
  },
  setVideoInfos(newVideoInfos) {
    this.videoInfos = new Set(newVideoInfos);
  },
};

export default state;
