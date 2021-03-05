import dom from './DOMelements.js';
import createKeywordList from './templates/keywordList.js';

const state = {
  videoInfos: new Set(),
  nextPageToken: '',
  latestKeywords: [],
  intersectionObserver: {},

  addVideoInfo(newVideoInfo) {
    this.videoInfos.add(newVideoInfo);
    localStorage.setItem('videoInfos', JSON.stringify([...this.videoInfos]));
    dom.$savedVideoCount.innerHTML = this.videoInfos.size;
  },
  setVideoInfos(newVideoInfos) {
    this.videoInfos = new Set(newVideoInfos);
    dom.$savedVideoCount.innerHTML = this.videoInfos.size;
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
    dom.$latestKeywordList.innerHTML = createKeywordList(this.latestKeywords);
  },
  setLatestKeywords(newKeywords) {
    this.latestKeywords = newKeywords;
    dom.$latestKeywordList.innerHTML = createKeywordList(this.latestKeywords);
  },
  setIntersectionObserver(observer) {
    this.intersectionObserver = observer;
  },
};

export default state;
