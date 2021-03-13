import { SELECTOR_ID } from './constants.js';
import { $ } from './utils/querySelector.js';

export const $searchButton = $(`#${SELECTOR_ID.SEARCH_BUTTON}`);
export const $searchForm = $(`#${SELECTOR_ID.SEARCH_FORM}`);
export const $searchFormInput = $(`#${SELECTOR_ID.SEARCH_FORM_INPUT}`);
export const $searchFormSubmit = $(`#${SELECTOR_ID.SEARCH_FORM_SUBMIT}`);
export const $modal = $(`#${SELECTOR_ID.MODAL}`);
export const $modalCloseButton = $(`#${SELECTOR_ID.MODAL_CLOSE_BUTTON}`);
export const $searchResultVideoWrapper = $(
  `#${SELECTOR_ID.SEARCH_RESULT_VIDEO_WRAPPER}`
);
export const $searchResultIntersector = $(
  `#${SELECTOR_ID.SERACH_RESULT_INTERSECTOR}`
);
export const $videoWrapper = $(`#${SELECTOR_ID.VIDEO_WRAPPER}`);
export const $searchQueries = $(`#${SELECTOR_ID.SEARCH_QUERIES}`);
export const $savedVideoCount = $(`#${SELECTOR_ID.SAVED_VIDEO_COUNT}`);
