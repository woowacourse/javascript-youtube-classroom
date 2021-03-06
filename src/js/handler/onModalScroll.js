import { LOCAL_STORAGE_KEY } from '../utils/constant.js';
import { request } from '../utils/fetch.js';
import storage from '../utils/localStorage.js';
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
  const keyword = storage.get(LOCAL_STORAGE_KEY.CURRENT_KEYWORD);
  const pageToken = storage.get(LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN) ?? '';

  const response = await request(keyword, pageToken);
  const recentSearchResults =
    storage.get(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS) ?? [];
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);

  recentSearchResults.push(...response.items);
  storage.set(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS, recentSearchResults);

  hideElement($skeletonWrapper);
  renderExtraClips(recentSearchResults, savedClipIds);
};
