import dom, { $ } from './DOMelements.js';
import fetchSearchResult from './searchAPI.js';
import state from './state.js';
import { createVideoListTemplate } from './templates/videoList.js';

export function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  state.intersectionObserver.disconnect();
  state.intersectionObserver.observe($lastVideo);
}

async function searchMoreVideos(entries) {
  const [$lastVideo] = entries;

  if ($lastVideo.isIntersecting) {
    state.intersectionObserver.disconnect();

    const { nextPageToken, items: searchResult } = await fetchSearchResult(
      state.latestKeywords[state.latestKeywords.length - 1],
      state.nextPageToken
    );

    state.setNextPageToken(nextPageToken);
    dom.$videoSearchResult.innerHTML += createVideoListTemplate(
      searchResult,
      state.videoInfos
    );
    const last = document.querySelector(
      '#video-search-result .js-video:last-child'
    );

    state.intersectionObserver.observe(last);
  }
}

function createIntersectionObserver() {
  const options = {
    root: document.getElementsByClassName('modal-inner')[0],
    rootMargin: '0px',
    threshold: 0.85,
  };

  return new IntersectionObserver(searchMoreVideos, options);
}

export default createIntersectionObserver;
