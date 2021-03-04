const state = {
  videoInfos: new Set(),
  nextPageToken: '',
  latestKeywords: [],
  addVideoInfo(newVideoInfo) {
    this.videoInfos.add(newVideoInfo);
  },
  setVideoInfos(newVideoInfos) {
    this.videoInfos = new Set(newVideoInfos);
  },
  setNextPageToken(newToken) {
    this.nextPageToken = newToken;
  },
  addLatestKeyword(newKeyword) {
    const targetIdx = this.latestKeywords.indexOf(newKeyword);

    if (targetIdx > -1) {
      this.latestKeywords.splice(targetIdx, 1);
    } else if (this.latestKeywords.length === 3) {
      this.latestKeywords.shift();
    }
    this.latestKeywords.push(newKeyword);
  },
};

export default state;
