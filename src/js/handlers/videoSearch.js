import $ from '../utils/DOM.js';
import { fetchSearchResult } from '../API.js';
import intersectionObserver from '../states/intersectionObserver.js';
import latestKeywords from '../states/latestKeywords.js';
import pageToken from '../states/pageToken.js';
import videoInfos from '../states/videoInfos.js';
import {
  renderVideoLoader,
  renderSearchVideoList,
  renderLatestKeywordList,
} from '../viewControllers/searchModal.js';

async function searchVideo(keyword) {
  renderVideoLoader();

  const { nextPageToken, items: videoList } = await fetchSearchResult(keyword);
  pageToken.set(nextPageToken);
  renderSearchVideoList(videoList, videoInfos.get());

  return videoList;
}

function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  intersectionObserver.disconnect();
  intersectionObserver.observe($lastVideo);
}

async function handleVideoSearch(e) {
  e.preventDefault();

  const keyword = e.target.className.includes('js-latest-keyword')
    ? e.target.innerText // 최근 검색어 클릭 시
    : e.target.elements['video-search-input'].value; // 검색 input에 직접 입력 시
  latestKeywords.add(keyword);
  renderLatestKeywordList(latestKeywords.get());

  const searchVideoList = await searchVideo(keyword);

  if (searchVideoList.length) {
    initInfiniteScroll();
  }
}

export default handleVideoSearch;
