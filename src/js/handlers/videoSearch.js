import { initInfiniteScroll, searchVideo } from '../service.js';
import latestKeywords from '../states/latestKeywords.js';
import videoInfos from '../states/videoInfos.js';
import {
  renderVideoLoader,
  renderVideoSearchResult,
} from '../viewControllers/searchModal.js';

async function handleVideoSearch(e) {
  e.preventDefault();

  const keyword = e.target.elements['video-search-input'].value;
  latestKeywords.add(keyword);

  renderVideoLoader();
  const resultItems = await searchVideo(keyword);
  renderVideoSearchResult(resultItems, videoInfos.get());

  if (resultItems.length) {
    initInfiniteScroll();
  }
}

export default handleVideoSearch;
