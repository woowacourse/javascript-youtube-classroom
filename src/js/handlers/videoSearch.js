import state from '../library/state.js';
import $ from '../library/utils/DOM.js';
import fetchSearchResult from '../library/searchAPI.js';
import {
  renderVideoLoader,
  renderVideoSearchResult,
} from '../viewControllers/searchModal.js';

function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  state.intersectionObserver.disconnect();
  state.intersectionObserver.observe($lastVideo);
}

async function searchVideo(keyword) {
  renderVideoLoader();
  const { nextPageToken, items } = await fetchSearchResult(keyword);
  state.setNextPageToken(nextPageToken);
  renderVideoSearchResult(items, state.videoInfos);

  return items;
}

async function handleVideoSearch(e) {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  state.addLatestKeyword(keyword);

  const resultItems = await searchVideo(keyword);
  if (resultItems.length) {
    initInfiniteScroll();
  }
}

export default handleVideoSearch;
