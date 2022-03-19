import { $ } from '../util/dom.js';
import YoutubeSearch from '../models/YoutubeSearch.js';
import searchResultView from '../views/searchResultView.js';
import { isEndOfScroll, throttle } from '../util/general.js';
import { ELEMENTS, VIDEO } from '../constants/constants.js';

const youtubeSearch = new YoutubeSearch();

const renderHandler = async () => {
  searchResultView.renderSkeletonUI();
  const response = await youtubeSearch.fetchYoutubeAPI();
  searchResultView.renderSearchResult(response);
  const isLastVideos = response.items.length !== 0 && !response.nextPageToken;
  if (isLastVideos) {
    ELEMENTS.VIDEO_LIST.removeEventListener(
      'scroll',
      throttle(handleVideoListScroll, VIDEO.THROTTLE_DELAY)
    );
  }
};

export const handleSearch = () => {
  try {
    const searchInput = $('#search-input-keyword').value.trim();
    youtubeSearch.searchTarget = searchInput;
    youtubeSearch.pageToken = '';
    searchResultView.resetVideoList();
    renderHandler();
  } catch (error) {
    alert(error.message);
  }
};

export const handleVideoListScroll = () => {
  if (isEndOfScroll(ELEMENTS.VIDEO_LIST)) {
    renderHandler();
  }
};
