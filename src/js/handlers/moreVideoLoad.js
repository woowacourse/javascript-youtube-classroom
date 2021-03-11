import { fetchSearchResult } from '../API.js';
import { appendVideoList } from '../viewControllers/searchModal.js';
import $ from '../utils/DOM.js';
import latestKeywords from '../states/latestKeywords.js';
import videoInfos from '../states/videoInfos.js';
import pageToken from '../states/pageToken.js';

async function handleMoreVideoLoad(entries) {
  const [$lastVideo] = entries;
  const intersectionObserver = this;

  if (!$lastVideo.isIntersecting) return;

  intersectionObserver.disconnect();

  const { nextPageToken, items: loadVideoList } = await fetchSearchResult(
    latestKeywords.getLastKeyword(),
    pageToken.get()
  );
  pageToken.set(nextPageToken);
  appendVideoList(loadVideoList, videoInfos.get());

  const $newLastVideo = $('#video-search-result .js-video:last-child');
  intersectionObserver.observe($newLastVideo);
}

export default handleMoreVideoLoad;
