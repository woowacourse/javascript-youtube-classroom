export const SELECTOR_ID = Object.freeze({
  SEARCH_BUTTON: 'search-button',
  SEARCH_FORM: 'search-form',
  SEARCH_FORM_INPUT: 'search-form__input',
  SEARCH_FORM_SUBMIT: 'search-form__submit',
  MODAL: 'modal',
  MODAL_CLOSE_BUTTON: 'modal__close-button',
  NAV: 'nav',
  SEARCH_CONTENT_VIDEO_WRAPPER: 'search-content__video-wrapper',
  SEARCH_CONTENT_SAVED_VIDEO_COUNT: 'search-content__saved-video-count',
  SERACH_CONTENT_INTERSECTOR: 'search-content__intersector',
  SERACH_CONTENT_VIDEO_NOT_FOUND: 'search-content__video-not-found',
  SAVED_VIDEO_WRAPPER: 'saved-video__wrapper',
  SAVED_VIDEO_NOT_FOUND: 'saved-video__not-found',
  SAVED_VIDEO_UP_INTERSECTOR: 'saved-video__up-intersector',
  SAVED_VIDEO_DOWN_INTERSECTOR: 'saved-video__down-intersector',
  SEARCH_QUERIES: 'search-queries',
  WATCHED_VIDEO_SWITCH_BUTTON: 'watched-video-switch-button',
  WATCHING_VIDEO_SWITCH_BUTTON: 'watching-video-switch-button',
  LIKE_VIDEO_FILTER_CHECKBOX: 'like-video-filter-checkbox',
  SNACKBAR_WRAPPER: 'snackbar-wrapper',
});

export const SELECTOR_CLASS = Object.freeze({
  SKELETON: 'js-skeleton',
  SEARCHED_CLIP: 'js-searched-clip',
  SEARCHED_CLIP_SAVE_BUTTON: 'js-searched-clip__save-button',
  SEARCH_QUERIES_CHIP: 'js-search-queries__chip',

  SAVED_CLIP: 'js-saved-clip',
  SAVED_CLIP_CHECK_BUTTON: 'js-saved-clip__check-button',
  SAVED_CLIP_UNCHECK_BUTTON: 'js-saved-clip__uncheck-button',
  SAVED_CLIP_DELETE_BUTTON: 'js-saved-clip__delete-button',
  SAVED_CLIP_LIKE_BUTTON: 'js-saved-clip__like-button',
  SAVED_CLIP_CANCEL_LIKE_BUTTON: 'js-saved-clip__cancel-like-button',

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
  LIKED: 'liked',
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
  SNACKBAR_PERSISTENT_MILLISEC: 3000,
});

export const LOCAL_STORAGE_KEY = Object.freeze({
  PREV_SEARCH_INFO: 'prev_search_info',
  SAVED_VIDEOS: 'saved_videos',
  SEARCHED_VIDEOS: 'searched_videos',
  SEARCH_QUERIES: 'search_queries',
});

export const CONFIRM_MESSAGE = Object.freeze({
  VIDEO_DELETE: '영상을 정말 삭제하시겠습니까?',
});

export const SNACKBAR_MESSAGE = Object.freeze({
  VIDEO_CHECK_SUCCESS: '본 영상으로 저장되었습니다.',
  VIDEO_UNCHECK_SUCCESS: '볼 영상으로 저장되었습니다.',
  VIDEO_DELETE_SUCCESS: '영상이 삭제되었습니다.',
  VIDEO_SAVE_SUCCESS: '볼 영상으로 저장되었습니다.',
  VIDEO_LIKE_SUCCESS: '좋아요 영상으로 저장되었습니다.',
  VIDEO_LIKE_CANCEL_SUCCESS: '영상의 좋아요를 취소하였습니다.',
  SAVE_LIMIT_EXCEEDED: `${SETTINGS.MAX_SAVE_COUNT}개 보다 많은 영상을 저장할 수 없습니다.`,
});

export const BROWSER_HASH = Object.freeze({
  WATCHING: 'watching',
  WATCHED: 'watched',
});

export const ERROR_LOG = Object.freeze({
  NOT_VIDEO: '비디오 형식에 맞지 않는 아이템입니다.',
});

export const FILTER_TYPE = Object.freeze({
  ALL: 'all',
  FULFILLED_ONLY: 'fulfilledOnly',
  NOT_FULFILLED_ONLY: 'notFulfilledOnly',
});

export const EMPTY = '';

export const SLICER = Object.freeze({
  INITIAL_FIRST_INDEX: 0,
  LOAD_VIDEO_AMOUNT: 20,
  SLICE_RATIO: 0.5,
});
