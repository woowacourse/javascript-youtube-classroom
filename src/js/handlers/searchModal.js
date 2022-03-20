import YoutubeSearch from '../models/YoutubeSearch.js';
import searchResultView from '../views/searchResultView.js';
import { isEndOfScroll } from '../util/general.js';
import { ELEMENTS, VIDEO } from '../constants/constants.js';

const youtubeSearch = new YoutubeSearch();

let throttle;

const removeScrollEvent = () => {
  ELEMENTS.VIDEO_LIST.removeEventListener('scroll', handleVideoListScroll);
};

export const handleSearch = async () => {
  try {
    const searchInput = ELEMENTS.SEARCH_INPUT_KEYWORD.value.trim();
    youtubeSearch.searchTarget = searchInput;
    youtubeSearch.pageToken = '';
    searchResultView.resetVideoList();
    searchResultView.renderSkeletonUI();
    const response = await youtubeSearch.fetchYoutubeAPI();
    searchResultView.renderSearchResult(response);
  } catch (error) {
    alert(error.message);
  }
};

export const handleVideoListScroll = async (e) => {
  if (isEndOfScroll(e.target) && !throttle) {
    searchResultView.renderSkeletonUI();
    const response = await youtubeSearch.fetchYoutubeAPI();
    searchResultView.renderSearchResult(response);
    const isLastVideos = response.items.length !== 0 && !response.nextPageToken;
    if (isLastVideos) {
      removeScrollEvent();
    }
    throttle = setTimeout(() => {
      throttle = null;
    }, VIDEO.THROTTLE_DELAY);
  }
};
