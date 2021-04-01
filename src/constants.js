export const SELECTOR_ID = Object.freeze({
  //modal view
  MODAL: 'modal',
  MODAL_CLOSE_BUTTON: 'modal__close-button',
  SEARCH_RESULT_VIDEO_WRAPPER: 'search-result__video-wrapper',
  SEARCH_FORM: 'search-form',
  SEARCH_FORM_INPUT: 'search-form__input',
  SEARCH_FORM_SUBMIT: 'search-form__submit',
  SEARCH_RESULT_INTERSECTOR: 'search-result__intersector',
  SEARCH_QUERIES: 'search-queries',
  SAVED_VIDEO_COUNT: 'saved-video-count',

  //index view
  VIDEO_WRAPPER: 'video-wrapper',
  NOT_FOUND_CONTENT: 'not-found-content',
  EMPTY_VIDEO: 'empty-video',
  SNACKBAR_WRAPPER: 'snackbar-wrapper',

  //navigation view
  NAV: 'nav',
  WATCHED_VIDEO_SWITCH_BUTTON: 'watched-video-switch-button',
  WATCHING_VIDEO_SWITCH_BUTTON: 'watching-video-switch-button',
  SEARCH_BUTTON: 'search-button',
});

export const SELECTOR_CLASS = Object.freeze({
  //modal view
  SEARCHED_CLIP: 'js-searched-clip',
  SEARCHED_CLIP_SAVE_BUTTON: 'js-searched-clip__save-button',
  SEARCH_QUERIES_CHIP: 'js-search-queries__chip',
  SKELETON: 'js-skeleton',

  //index view
  NAV_BUTTON: 'js-nav__button',
  CLIP_CHECK_BUTTON: 'js-clip__check-button',
  CLIP_DELETE_BUTTON: 'js-clip__delete-button',
  CLIP_FAVORITE_BUTTON: 'js-clip__favorite-button',

  //common
  CLIP: 'js-clip',
  SNACKBAR: 'js-snackbar',
});

export const STYLE_CLASS = Object.freeze({
  OPEN: 'open',
  CLOSE: 'close',

  SUCCESS: 'success',
  FAIL: 'fail',

  SNACKBAR: 'snackbar',

  NAV_CLICKED: 'clicked',
  VIDEO_CHECKED: 'checked',
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
  PREV_SEARCH_RESULT: 'prev_search_result',
  VIDEOS: 'videos',
  SEARCH_QUERIES: 'search_queries',
});

export const CONFIRM_MESSAGE = Object.freeze({
  VIDEO_DELETE: '영상을 정말 삭제하시겠습니까?',
});

export const SNACKBAR_MESSAGE = Object.freeze({
  //TODO: CHECK를 SAVE로 바꾸기
  WATCHED_VIDEO_CHECK_SUCCESS: '본 영상으로 저장되었습니다.',

  WATCHING_VIDEO_CHECK_SUCCESS: '볼 영상으로 이동되었습니다.',
  WATCHING_VIDEO_SAVE_SUCCESS: '볼 영상으로 이동되었습니다.',

  FAVORITE_VIDEO_SAVE_SUCCESS: '좋아요 한 영상으로 저장되었습니다.',

  VIDEO_DELETE_SUCCESS: '영상에서 삭제되었습니다.',

  SAVE_LIMIT_EXCEEDED: `${SETTINGS.MAX_SAVE_COUNT}개 보다 많은 영상을 저장할 수 없습니다.`,
});

export const BROWSER_HASH = Object.freeze({
  WATCHING: 'watching',
  WATCHED: 'watched',
  SEARCH: 'search',
  FAVORITE: 'favorite',
});

export const CONTROLLER_KEYWORD = {
  WATCHING: 'watching',
  WATCHED: 'watched',
};

export const STORAGE_KEYWORD = {
  IS_WATCHED: 'isWatched',
  IS_FAVORITE: 'isFavorite',
};
