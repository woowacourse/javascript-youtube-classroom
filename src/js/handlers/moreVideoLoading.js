import { fetchSearchResult } from '../library/API.js';
import state from '../library/state.js';
import { appendVideos } from '../viewControllers/searchModal.js';
import $ from '../library/utils/DOM.js';

async function handleMoreVideoLoading(entries) {
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

export default handleMoreVideoLoading;
