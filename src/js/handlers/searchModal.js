import { $ } from '../util/dom.js';
import YoutubeSearch from '../domain/YoutubeSearch.js';
import searchResultView from '../views/searchResultView.js';
import { isEndOfScroll, throttle } from '../util/general.js';
import { VIDEO } from '../constants/constants.js';

const youtubeSearch = new YoutubeSearch();

const renderHandler = async () => {
  searchResultView.renderSkeletonUI();
  const response = await youtubeSearch.fetchYoutubeAPI();
  searchResultView.renderSearchResult(response);
  const isLastVideos = response.items.length !== 0 && !response.nextPageToken;
  if (isLastVideos) {
    $('.video-list').removeEventListener(
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
  if (isEndOfScroll($('.search-result'))) {
    renderHandler();
  }
};
