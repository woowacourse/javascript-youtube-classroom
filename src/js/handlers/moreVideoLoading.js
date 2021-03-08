import { fetchSearchResult } from '../library/API.js';
import { appendVideos } from '../viewControllers/searchModal.js';
import $ from '../library/utils/DOM.js';
import latestKeywords from '../library/states/latestKeywords.js';
import videoInfos from '../library/states/videoInfos.js';
import pageToken from '../library/states/pageToken.js';

async function handleMoreVideoLoading(entries) {
  const [$lastVideo] = entries;
  const intersectionObserver = this;

  if (!$lastVideo.isIntersecting) return;

  intersectionObserver.disconnect();

  const { nextPageToken, items } = await fetchSearchResult(
    latestKeywords.get()[latestKeywords.get().length - 1],
    pageToken.get()
  );

  pageToken.set(nextPageToken);
  appendVideos(items, videoInfos.get());

  const $newLastVideo = $('#video-search-result .js-video:last-child');

  intersectionObserver.observe($newLastVideo);
}

export default handleMoreVideoLoading;
