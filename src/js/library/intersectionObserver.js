import { appendVideos } from '../viewController.js';
import { $ } from './DOMelements.js';
import fetchSearchResult from './searchAPI.js';
import state from './state.js';

export function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  state.intersectionObserver.disconnect();
  state.intersectionObserver.observe($lastVideo);
}

async function searchMoreVideos(entries) {
  const [$lastVideo] = entries;
  if (!$lastVideo.isIntersecting) return;

  state.intersectionObserver.disconnect();

  const { nextPageToken, items } = await fetchSearchResult(
    state.latestKeywords[state.latestKeywords.length - 1],
    state.nextPageToken
  );

  state.setNextPageToken(nextPageToken);
  appendVideos(items, state.videoInfos);

  const $newLastVideo = $('#video-search-result .js-video:last-child');

  state.intersectionObserver.observe($newLastVideo);
}

function createIntersectionObserver() {
  const options = {
    root: $('.modal-inner'),
    rootMargin: '0px',
    threshold: 0.85,
  };

  return new IntersectionObserver(searchMoreVideos, options);
}

export default createIntersectionObserver;
