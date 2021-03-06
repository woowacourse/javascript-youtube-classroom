import { $ } from '../utils/querySelector.js';
import { YOUTUBE, ERROR_MESSAGE } from '../utils/constant.js';
import { request } from '../utils/fetch.js';
import { showElement, hideElement } from '../utils/setAttribute.js';
import localStorage from '../utils/localStorage.js';
import {
  clearSearchResult,
  renderClips,
  renderRecentKeywords,
} from '../view/modal.js';

const getRecentKeywords = (keyword) => {
  const keywords = localStorage.get('recentKeywords') ?? [];
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

  const $input = $('[data-js=youtube-search-modal__input]');
  const keyword = $input.value;
  if (isEmpty(keyword)) {
    alert(ERROR_MESSAGE.EMPTY_KEYWORD);
  }

  const response = await request(keyword);
  const videoItems = response.items;

  localStorage.set('recentKeywords', getRecentKeywords(keyword));
  localStorage.set('currentKeyword', keyword);
  localStorage.set('nextPageToken', response.nextPageToken);
  localStorage.set('recentSearchResults', videoItems);

  hideElement($skeletonWrapper);

  if (videoItems.length === 0) {
    showElement($('[data-js=youtube-search-modal__not-found]'));
    clearSearchResult();
    return;
  }

  hideElement($('[data-js=youtube-search-modal__not-found]'));

  const savedClips = localStorage.get('savedClips') ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);
  renderClips(videoItems, savedClipIds);

  const recentKeywords = localStorage.get('recentKeywords') ?? [];
  renderRecentKeywords(recentKeywords);
  $input.value = '';
};
