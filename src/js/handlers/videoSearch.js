import { searchVideo } from '../service.js';
import intersectionObserver from '../states/intersectionObserver.js';
import latestKeywords from '../states/latestKeywords.js';
import videoInfos from '../states/videoInfos.js';
import $ from '../utils/DOM.js';
import {
  renderLatestKeywordList,
  renderVideoLoader,
  renderVideoSearchResult,
} from '../viewControllers/searchModal.js';

function initInfiniteScroll() {
  const $lastVideo = $('#video-search-result .js-video:last-child');

  intersectionObserver.disconnect();
  intersectionObserver.observe($lastVideo);
}

async function handleVideoSearch(e) {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  latestKeywords.add(keyword);
  renderLatestKeywordList(latestKeywords.get());

  renderVideoLoader();
  const resultItems = await searchVideo(keyword);
  renderVideoSearchResult(resultItems, videoInfos.get());

  if (resultItems.length) {
    initInfiniteScroll();
  }
}

export default handleVideoSearch;
