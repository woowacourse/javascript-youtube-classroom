import { getQueryString } from '../utils/getQueryString.js';
import {
  YOUTUBE,
  MESSAGE,
  LOCAL_STORAGE_KEY,
  BASE_URL,
} from '../utils/constant.js';
import { request } from '../utils/fetch.js';
import { showElement, hideElement } from '../utils/setAttribute.js';
import storage from '../utils/localStorage.js';
import {
  clearSearchResult,
  renderClips,
  renderRecentKeywords,
} from '../view/modal.js';
import { snackbar } from '../utils/snackbar.js';
import $DOM from '../utils/DOM.js';

const getRecentKeywords = (keyword) => {
  const keywords = storage.get(LOCAL_STORAGE_KEY.RECENT_KETWORDS) ?? [];

  if (keywords.includes(keyword)) {
    keywords.splice(keywords.indexOf(keyword), 1);
  }

  if (keywords.length >= YOUTUBE.MAXMIMUM_RECENT_KEYWORD_LENGTH) {
    keywords.splice(2);
  }

  keywords.splice(0, 0, keyword);
  return keywords;
};

const isEmpty = (value) => {
  return value.trim('').length < 1;
};

const renderResult = (videoItems) => {
  if (videoItems.length === 0) {
    showElement($DOM.SEARCH_MODAL.NOT_FOUND);
    clearSearchResult();
    return;
  }

  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const savedClipIds = savedClips.map((savedClip) => savedClip.id.videoId);

  hideElement($DOM.SEARCH_MODAL.NOT_FOUND);
  renderClips(videoItems, savedClipIds);
};

const setSearchKeyword = (keyword) => {
  storage.set(LOCAL_STORAGE_KEY.RECENT_KETWORDS, getRecentKeywords(keyword));
  storage.set(LOCAL_STORAGE_KEY.CURRENT_KEYWORD, keyword);
};

const setSearchResult = (response) => {
  const { items, nextPageToken } = response;

  storage.set(LOCAL_STORAGE_KEY.NEXT_PAGE_TOKEN, nextPageToken || '');
  storage.set(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS, items);

  const recentKeywords = storage.get(LOCAL_STORAGE_KEY.RECENT_KETWORDS) ?? [];

  renderRecentKeywords(recentKeywords);
  renderResult(items);
};

const searchRequest = async (keyword) => {
  showElement($DOM.SEARCH_MODAL.SKELETON_WRAPPER);

  if (isEmpty(keyword)) {
    snackbar(MESSAGE.ERROR.EMPTY_KEYWORD);
  }

  $DOM.SEARCH_MODAL.VIDEO_WRAPPER.innerHTML = '';

  const queryString = getQueryString({
    part: 'snippet',
    maxResults: YOUTUBE.NUMBER_TO_LOAD,
    q: keyword,
  });
  const response = await request(BASE_URL + queryString);

  hideElement($DOM.SEARCH_MODAL.SKELETON_WRAPPER);

  setSearchKeyword(keyword);
  setSearchResult(response);
};

export const onSearchClip = (event) => {
  event.preventDefault();

  const $input = event.target.elements['youtube-search-modal__input'];
  const keyword = $input.value;
  searchRequest(keyword);

  $input.value = '';
};

export const onSearchByKeyword = ({ target }) => {
  if (target.dataset.js !== 'youtube-search-modal__chip') {
    return;
  }

  const keyword = target.innerText;
  searchRequest(keyword);
};
