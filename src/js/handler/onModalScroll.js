import { request } from '../utils/fetch.js';
import localStorage from '../utils/localStorage.js';
import { $ } from '../utils/querySelector.js';
import { hideElement, showElement } from '../utils/setAttribute.js';
import { renderExtraClips } from '../view/modal.js';

export const onModalScroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight < scrollHeight - 5) {
    return;
  }

  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );

  showElement($skeletonWrapper);
  const keyword = localStorage.get('currentKeyword');
  const pageToken = localStorage.get('nextPageToken') ?? '';

  const response = await request(keyword, pageToken);
  const recentSearchResults = localStorage.get('recentSearchResults') ?? [];
  const savedClips = localStorage.get('savedClips') ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);

  recentSearchResults.push(...response.items);
  localStorage.set('recentSearchResults', recentSearchResults);

  hideElement($skeletonWrapper);
  renderExtraClips(recentSearchResults, savedClipIds);
};
