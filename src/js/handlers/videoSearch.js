import $ from '../utils/DOM.js';
import { fetchSearchResult } from '../API.js';
import {
  renderVideoLoader,
  renderVideoSearchResult,
} from '../viewControllers/searchModal.js';
import intersectionObserver from '../states/intersectionObserver.js';
import pageToken from '../states/pageToken.js';
import latestKeywords from '../states/latestKeywords.js';
import videoInfos from '../states/videoInfos.js';

function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  intersectionObserver.disconnect();
  intersectionObserver.observe($lastVideo);
}

async function searchVideo(keyword) {
  renderVideoLoader();
  const { nextPageToken, items } = await fetchSearchResult(keyword);
  pageToken.set(nextPageToken);
  renderVideoSearchResult(items, videoInfos.get());

  return items;
}

async function handleVideoSearch(e) {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  latestKeywords.add(keyword);

  const resultItems = await searchVideo(keyword);
  if (resultItems.length) {
    initInfiniteScroll();
  }
}

export default handleVideoSearch;
