import dom from './DOMelements.js';

const state = {
  videoInfos: new Set(),
  nextPageToken: '',
  latestKeywords: [],
  addVideoInfos(...newVideoInfos) {
    newVideoInfos.forEach(newVideoInfo => this.videoInfos.add(newVideoInfo));
    dom.$savedVideoCount.innerHTML = state.videoInfos.length;
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
    localStorage.setItem('latestKeywords', JSON.stringify(this.latestKeywords));
  },
  setLatestKeywords(newKeywords) {
    this.latestKeywords = newKeywords;
  },
};

export default state;
