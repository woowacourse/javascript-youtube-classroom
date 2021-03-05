import state from '../library/state.js';
import fetchSearchResult from '../library/searchAPI.js';
import {
  renderVideoLoader,
  renderVideoSearchResult,
} from '../viewController.js';
import { initInfiniteScroll } from '../library/intersectionObserver.js';

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
