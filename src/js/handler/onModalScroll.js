import { YOUTUBE, LOCAL_STORAGE_KEY, BASE_URL } from '../utils/constant.js';
import { request } from '../utils/fetch.js';
import storage from '../utils/localStorage.js';
import { $ } from '../utils/querySelector.js';
import { hideElement, showElement } from '../utils/setAttribute.js';
import { renderExtraClips } from '../view/modal.js';
import { getQueryString } from '../utils/getQueryString.js';
import { API_KEY } from '../utils/env.js';

export const onModalScroll = async (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;

  if (scrollTop + clientHeight < scrollHeight) {
    return;
  }

  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );

  showElement($skeletonWrapper);
  const keyword = storage.get(LOCAL_STORAGE_KEY.CURRENT_KEYWORD);
  const pageToken = storage.get(LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN) ?? '';

  const queryString = getQueryString({
    part: 'snippet',
    maxResults: YOUTUBE.NUMBER_TO_LOAD,
    q: keyword,
    key: API_KEY,
    pageToken,
  });
  const response = await request(BASE_URL + queryString);
  const recentSearchResults =
    storage.get(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS) ?? [];
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);

  recentSearchResults.push(...response.items);
  storage.set(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS, recentSearchResults);

  hideElement($skeletonWrapper);
  renderExtraClips(recentSearchResults, savedClipIds);
};
