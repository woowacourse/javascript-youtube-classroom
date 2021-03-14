import { SELECTOR_ID } from './constants.js';
import { $ } from './utils/querySelector.js';

//modal view
export const $searchForm = $(`#${SELECTOR_ID.SEARCH_FORM}`);
export const $searchFormInput = $(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);
export const $searchFormSubmit = $(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
export const $modal = $(`#${SELECTOR_ID.MODAL}`);
export const $modalCloseButton = $(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
export const $searchResultVideoWrapper = $(
  `#${SELECTOR_ID.SEARCH_RESULT_VIDEO_WRAPPER}`
);
export const $searchResultIntersector = $(
  `#${SELECTOR_ID.SEARCH_RESULT_INTERSECTOR}`
);
export const $searchQueries = $(`#${SELECTOR_ID.SEARCH_QUERIES}`);
export const $savedVideoCount = $(`#${SELECTOR_ID.SAVED_VIDEO_COUNT}`);

//main view
export const $nav = $(`#${SELECTOR_ID.NAV}`);
export const $watchingVideoButton = $(`#${SELECTOR_ID.WATCHING_VIDEO_BUTTON}`);
export const $watchedVideoButton = $(`#${SELECTOR_ID.WATCHED_VIDEO_BUTTON}`);
export const $searchButton = $(`#${SELECTOR_ID.SEARCH_BUTTON}`);
export const $watchedVideoWrapper = $(`#${SELECTOR_ID.WATCHED_VIDEO_WRAPPER}`);
export const $watchingVideoWrapper = $(
  `#${SELECTOR_ID.WATCHING_VIDEO_WRAPPER}`
);
export const $emptyWatchingVideo = $(`#${SELECTOR_ID.EMPTY_WATCHING_VIDEO}`);
export const $emptyWatchedVideo = $(`#${SELECTOR_ID.EMPTY_WATCHED_VIDEO}`);

//common
export const $snackbarWrapper = $(`#${SELECTOR_ID.SNACKBAR_WRAPPER}`);
