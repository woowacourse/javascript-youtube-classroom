import { request } from '../utils/fetch.js';
import { $ } from '../utils/querySelector.js';
import { showElement, hideElement } from '../utils/setAttribute.js';
import localStorage from '../utils/localStorage.js';
import {
  clearSearchResult,
  renderClips,
  renderRecentKeywords,
} from '../view/modal.js';

const getRecentKeywords = (keyword) => {
  const keywords = localStorage.get('recentKeywords') ?? [];
  if (keywords.length >= 3) {
    keywords.splice(2);
  }

  keywords.splice(0, 0, keyword);
  return keywords;
};

export const onSearchYoutube = async (event) => {
  event.preventDefault();

  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );
  showElement($skeletonWrapper);

  const $input = $('[data-js=youtube-search-modal__input]');
  const keyword = $input.value;
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
};
