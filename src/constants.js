export const SELECTOR_ID = Object.freeze({
  SEARCH_FORM: 'search-form',
  SEARCH_FORM_INPUT: 'search-form__input',
  SEARCH_FORM_SUBMIT: 'search-form__submit',
  MODAL: 'modal',
  MODAL_CLOSE_BUTTON: 'modal__close-button',
  SEARCH_RESULT_VIDEO_WRAPPER: 'search-result__video-wrapper',
  VIDEO_WRAPPER: 'video-wrapper',
  NOT_FOUND_CONTENT: 'not-found-content',
  SEARCH_RESULT_INTERSECTOR: 'search-result__intersector',
  SEARCH_QUERIES: 'search-queries',
  SAVED_VIDEO_COUNT: 'saved-video-count',

  WATCHING_VIDEO_BUTTON: 'watching-video-button',
  WATCHED_VIDEO_BUTTON: 'watched-video-button',
  SEARCH_BUTTON: 'search-button',

  EMPTY_VIDEO_TO_WATCH: 'empty-video-to-watch',
});

export const SELECTOR_CLASS = Object.freeze({
  SKELETON: 'js-skeleton',
  SEARCHED_CLIP: 'js-searched-clip',
  SEARCHED_CLIP_SAVE_BUTTON: 'js-searched-clip__save-button',
  SEARCH_QUERIES_CHIP: 'js-search-queries__chip',
  NAV_BUTTON: 'js-nav__button',

  CLIP: 'js-clip',
  CLIP_CHECK_BUTTON: 'js-clip__check-button',
});

export const STYLE_CLASS = Object.freeze({
  OPEN: 'open',
  CLOSE: 'close',

  CLICKED: 'clicked',
});

export const YOUTUBE = Object.freeze({
  MAX_RESULT_COUNT: 10,
});

export const SETTINGS = Object.freeze({
  MAX_SAVE_COUNT: 100,
  MAX_SAVED_SEARCH_QUERY_COUNT: 3,
});

export const LOCAL_STORAGE_KEY = Object.freeze({
  PREVIOUS_SEARCH_VIDEOS: 'previous_search_videos',
  VIDEOS_TO_WATCH: 'videos_to_watch',
  SEARCH_QUERIES: 'search_queries',
  LAST_QUERY: 'last_query',
  NEXT_PAGE_TOKEN: 'next_page_token',
});

export const ALERT_MESSAGE = {
  SAVE_LIMIT_EXCEEDED: `${SETTINGS.MAX_SAVE_COUNT}개 보다 많은 영상을 저장할 수 없습니다.`,
};
