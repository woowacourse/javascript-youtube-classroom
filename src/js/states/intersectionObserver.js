import { fetchSearchResult } from '../API.js';
import $ from '../utils/DOM.js';
import { appendVideoList } from '../viewControllers/searchModal.js';
import latestKeywords from './latestKeywords.js';
import pageToken from './pageToken.js';
import videoInfos from './videoInfos.js';

const intersectionObserver = {
  value: {},
  options: {
    root: $('.modal-inner'),
    rootMargin: '0px',
    threshold: 0.85,
  },

  init() {
    this.set(new IntersectionObserver(this.moreVideoLoad, this.options));
  },

  set(observer) {
    this.value = observer;
  },

  get() {
    return this.value;
  },

  disconnect() {
    this.value.disconnect();
  },

  observe($target) {
    this.value.observe($target);
  },

  async moreVideoLoad(entries) {
    const [$lastVideo] = entries;
    if (!$lastVideo.isIntersecting) return;

    this.disconnect(); // 이전 마지막 비디오와 observer의 연결 해제

    const { nextPageToken, items: loadVideoList } = await fetchSearchResult(
      latestKeywords.getLastKeyword(),
      pageToken.get()
    );
    pageToken.set(nextPageToken);
    appendVideoList(loadVideoList, videoInfos.get());

    const $newLastVideo = $('#video-search-result .js-video:last-child');
    this.observe($newLastVideo);
  },
};

export default intersectionObserver;
