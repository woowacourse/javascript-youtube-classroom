import { $ } from './querySelector.js';

export default {
  NAVIGATOR: {
    CONTAINER: $('[data-js="navigator"]'),
    WATCHED_BUTTON: $('[data-js="navigator__watched-button"]'),
    UNWATCHED_BUTTON: $('[data-js="navigator__unwatched-button"]'),
    SEARCH_BUTTON: $('[data-js="navigator__search-button"]'),
  },
  SEARCH_MODAL: {
    CONTAINER: $('[data-js="youtube-search-modal"]'),
    INNER: $('[data-js="youtube-search-modal__inner"]'),
    FORM: $('[data-js="youtube-search-modal__form"]'),
    INPUT: $('[data-js="youtube-search-modal__input"]'),
    RECENT_KEYWORDS: $('[data-js="youtube-search-modal__recent-keywords"]'),
    SAVE_VIDEO_COUNT: $('[data-js="youtube-search-modal__save-video-count"]'),
    VIDEO_WRAPPER: $('[data-js="youtube-search-modal__video-wrapper"]'),
    CHIP_CONTAINER: $('[data-js="youtube-search-modal__chip-container"]'),
    SKELETON_WRAPPER: $('[data-js=youtube-search-modal__skeleton-wrapper]'),
    NOT_FOUND: $('[data-js="youtube-search-modal__not-found"]'),
  },
  SAVE_PAGE: {
    VIDEO_WRAPPER: $('[data-js="saved-page__video-wrapper"]'),
    NOT_FOUND: $('[data-js="saved-page__not-found"]'),
  },
  SNACK_BAR: {
    CONTINAER: $('[data-js="snackbar"]'),
  },
};
