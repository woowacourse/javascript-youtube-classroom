export const SELECTOR_ID = Object.freeze({
  SEARCH_BUTTON: 'search-button',
  SEARCH_FORM: 'search-form',
  SEARCH_FORM_INPUT: 'search-form__input',
  SEARCH_FORM_SUBMIT: 'search-form__submit',
  MODAL: 'modal',
  MODAL_CLOSE_BUTTON: 'modal__close-button',
  SEARCH_RESULT_VIDEO_WRAPPER: 'search-result__video-wrapper',
  WATCHING_VIDEO_WRAPPER: 'watching-video-wrapper',
  SEARCHED_VIDEO_NOT_FOUND: 'searched-video-not-found',
  SERACH_RESULT_INTERSECTOR: 'search-result__intersector',
  SEARCH_QUERIES: 'search-queries',
  WATCHING_VIDEO_SWITCH_BUTTON: 'watching-video-switch-button',
  EMPTY_WATCHING_VIDEO: 'empty-watching-video',
  NAV: 'nav',
  SAVED_VIDEO_COUNT: 'saved-video-count',
});

export const SELECTOR_CLASS = Object.freeze({
  SKELETON: 'js-skeleton',
  SEARCHED_CLIP: 'js-searched-clip',
  SEARCHED_CLIP_SAVE_BUTTON: 'js-searched-clip__save-button',
  SEARCH_QUERIES_CHIP: 'js-search-queries__chip',

  CLIP: 'js-clip',
  CLIP_CHECK_BUTTON: 'js-clip__check-button',
  CLIP_DELETE_BUTTON: 'js-clip__delete-button',

  SNACKBAR: 'js-snackbar',
  NAV_BUTTON: 'js-nav__button',
});

export const STYLE_CLASS = Object.freeze({
  OPEN: 'open',
  CLOSE: 'close',
  SUCCESS: 'success',
  FAIL: 'fail',
  SNACKBAR: 'snackbar',
  CLICKED: 'clicked',
  CHECKED: 'checked',
});

export const ANIMATION_CLASS = Object.freeze({
  FADE_IN_AND_OUT: 'fade-in-and-out',
});

export const YOUTUBE = Object.freeze({
  MAX_RESULT_COUNT: 10,
});

export const SETTINGS = Object.freeze({
  MAX_SAVE_COUNT: 100,
  MAX_SAVED_SEARCH_QUERY_COUNT: 3,
});

export const LOCAL_STORAGE_KEY = Object.freeze({
  PREV_SEARCH_RESULT: 'prev_search_result',
  WATCHING_VIDEOS: 'watching_videos',
  WATCHED_VIDEOS: 'watched_videos',
  SEARCH_QUERIES: 'search_queries',
});

export const CONFIRM_MESSAGE = Object.freeze({
  WATCHING_VIDEO_DELETE: '볼 영상을 정말 삭제하시겠습니까?',
  WATCHED_VIDEO_DELETE: '본 영상을 정말 삭제하시겠습니까?',
});

export const ALERT_MESSAGE = Object.freeze({
  SAVE_LIMIT_EXCEEDED: `${SETTINGS.MAX_SAVE_COUNT}개 보다 많은 영상을 저장할 수 없습니다.`,
});

export const BROWSER_HASH = Object.freeze({
  WATCHING: 'watching',
  WATCHED: 'watched',
});
