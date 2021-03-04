const state = {
  videoInfos: new Set(),
  nextPageToken: '',
  keyword: '',
  addVideoInfo(newVideoInfo) {
    this.videoInfos.add(newVideoInfo);
  },
  setVideoInfos(newVideoInfos) {
    this.videoInfos = new Set(newVideoInfos);
  },
  setNextPageToken(newToken) {
    this.nextPageToken = newToken;
  },
  setKeyword(newKeyword) {
    this.keyword = newKeyword;
  },
};

export default state;
