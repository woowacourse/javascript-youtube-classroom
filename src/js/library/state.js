// TODO: 도메인 별로 상태객체

import {
  renderSavedVideoCount,
  renderSavedVideoList,
  renderLatestKeywordList,
} from '../viewController.js';

const state = {
  videoInfos: new Set(),
  nextPageToken: '',
  latestKeywords: [],
  intersectionObserver: {},

  addVideoInfo(newVideoInfo) {
    this.videoInfos.add(newVideoInfo);
    localStorage.setItem('videoInfos', JSON.stringify([...this.videoInfos]));

    renderSavedVideoCount(this.videoInfos.size);
    renderSavedVideoList(this.videoInfos);
  },
  setVideoInfos(newVideoInfos) {
    this.videoInfos = new Set(newVideoInfos);

    renderSavedVideoCount(this.videoInfos.size);
    renderSavedVideoList(this.videoInfos);
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

    renderLatestKeywordList(this.latestKeywords);
  },
  setLatestKeywords(newKeywords) {
    this.latestKeywords = newKeywords;

    renderLatestKeywordList(this.latestKeywords);
  },
  setIntersectionObserver(observer) {
    this.intersectionObserver = observer;
  },
};

export default state;
