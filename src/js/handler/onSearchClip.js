import { $ } from '../utils/querySelector.js';
import {
  YOUTUBE,
  ERROR_MESSAGE,
  LOCAL_STORAGE_KEY,
} from '../utils/constant.js';
import { request } from '../utils/fetch.js';
import { showElement, hideElement } from '../utils/setAttribute.js';
import storage from '../utils/localStorage.js';
import {
  clearSearchResult,
  renderClips,
  renderRecentKeywords,
} from '../view/modal.js';

const getRecentKeywords = (keyword) => {
  const keywords = storage.get(LOCAL_STORAGE_KEY.RECENT_KETWORDS) ?? [];
  if (keywords.length >= YOUTUBE.MAXMIMUM_RECENT_KEYWORD_LENGTH) {
    keywords.splice(2);
  }

  keywords.splice(0, 0, keyword);
  return keywords;
};

const isEmpty = (value) => {
  return value.trim('').length < 1;
};

export const onSearchClip = async (event) => {
  event.preventDefault();

  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );
  showElement($skeletonWrapper);

  const $input = event.target.elements['youtube-search-modal__input'];

  const keyword = $input.value;
  if (isEmpty(keyword)) {
    alert(ERROR_MESSAGE.EMPTY_KEYWORD);
  }

  const response = await request(keyword);
  const videoItems = response.items;

  storage.set(LOCAL_STORAGE_KEY.RECENT_KETWORDS, getRecentKeywords(keyword));
  storage.set(LOCAL_STORAGE_KEY.CURRENT_KEYWORD, keyword);
  storage.set(LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN, response.nextPageToken);
  storage.set(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS, videoItems);

  hideElement($skeletonWrapper);

  if (videoItems.length === 0) {
    showElement($('[data-js=youtube-search-modal__not-found]'));
    clearSearchResult();
    return;
  }

  hideElement($('[data-js=youtube-search-modal__not-found]'));

  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);
  renderClips(videoItems, savedClipIds);

  const recentKeywords = storage.get(LOCAL_STORAGE_KEY.RECENT_KETWORDS) ?? [];
  renderRecentKeywords(recentKeywords);
  $input.value = '';
};
