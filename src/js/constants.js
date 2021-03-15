const CLASSNAME = Object.freeze({
  WATCH_LATER_TAB: "js-watch-later-tab",
  WATCH_LATER_CONTAINER: "js-watch-later-container",
  WATCH_LATER_VIDEO_WRAPPER: "js-watch-later-video-wrapper",
  HISTORY_TAB: "js-history-tab",
  HISTORY_CONTAINER: "js-history-container",
  HISTORY_VIDEO_WRAPPER: "js-history-video-wrapper",
  SEARCH_TAB: "js-search-tab",
  SEARCH_CONTAINER: "js-search-container",
  SEARCH_VIDEO_WRAPPER: "js-search-video-wrapper",
  SEARCH_FORM: "js-search-form",
  SEARCH_FORM_INPUT: "js-search-form__input",
  SEARCH_FORM_BUTTON: "js-search-form__button",
  SAVED_VIDEOS_COUNT: "js-saved-videos-count",
  MAX_SAVED_VIDEOS_COUNT: "js-max-saved-videos-count",
  KEYWORD_HISTORY_SECTION: "js-keyword-history-section",
  MODAL: "modal",
  MODAL_INNER: "modal-inner",
  MODAL_CLOSE: "modal-close",
  NOT_FOUND_IMAGE: "js-not-found-img",
  NO_SAVED_VIDEO_IMAGE: "js-no-saved-video-img",
  VIDEO_ID: "js-video-id",
  VIDEO_TITLE: "js-video-title",
  CHANNEL_TITLE: "js-channel-title",
  PUBLISHED_AT: "js-published-at",
  SAVE_VIDEO_BUTTON_WRAPPER: "js-save-video-button-wrapper",
  SAVE_VIDEO_BUTTON: "js-save-video-button",
  SKELETON: "skeleton",
  OPEN: "open",
  HIDDEN: "--hidden",
  CANCEL: "cancel",
  BG_CYAN_100: "bg-cyan-100",
  ICONS_WRAPPER: "js-icons-wrapper",
  WATCHED_ICON: "js-watched-icon",
  WATCH_LATER_ICON: "js-watch-later-icon",
  LIKE_ICON: "js-like-icon",
  COMMENT_ICON: "js-comment-icon",
  DELETE_ICON: "js-delete-icon",
  SNACKBAR: "snackbar",
  MODAL_SNACKBAR: "js-modal-snackbar",
  SHOW: "show",
});

const MESSAGE = Object.freeze({
  KEYWORD_SUBMITTED: "KEYWORD_SUBMITTED",
  DATA_LOADED: "DATA_LOADED",
  SAVE_VIDEO_BUTTON_CLICKED: "SAVE_VIDEO_BUTTON_CLICKED",
  CANCEL_VIDEO_BUTTON_CLICKED: "CANCEL_VIDEO_BUTTON_CLICKED",
  SAVED_VIDEOS_COUNT_CHANGED: "SAVED_VIDEOS_COUNT_CHANGED",
  SAVE_IF_VIDEOS_COUNT_IS_IN_RANGE: "SAVE_IF_VIDEOS_COUNT_IS_IN_RANGE",
  HIDE_IF_VIDEO_IS_SAVED: "HIDE_IF_VIDEO_IS_SAVED",
  WATCHED_ICON_CLICKED: "WATCHED_ICON_CLICKED",
  WATCH_LATER_ICON_CLICKED: "WATCH_LATER_ICON_CLICKED",
  SAVED_VIDEO_DELETED: "SAVED_VIDEO_DELETED",
});

const MAX_SAVED_VIDEOS_COUNT = 100;

const SNACKBAR_MESSAGE = Object.freeze({
  MOVED_TO_HISTORY_VIDEO: "🟢 본 영상으로 이동되었습니다",
  MOVED_TO_WATCH_LATER_VIDEO: "🟠 볼 영상으로 이동되었습니다",
  VIDEO_DELETED: "영상이 삭제되었습니다",
  VIDEO_SAVED: "영상이 저장되었습니다",
  CANCELED_VIDEO_SAVE: "저장을 취소하였습니다",
  REACHED_MAX_COUNT: `영상은 ${MAX_SAVED_VIDEOS_COUNT}개 이하만 저장할 수 있습니다`,
});

const LOCAL_STORAGE_KEY = Object.freeze({
  WATCH_LATER_VIDEO_ITEMS: "watchLaterVideoItems",
  HISTORY_VIDEO_ITEMS: "historyVideoItems",
  SAVED_VIDEOS_COUNT: "savedVideosCount",
  KEYWORD_HISTORY: "keywordHistory",
  QUERY: "query",
});

const REGULAR_EXPRESSION = Object.freeze({
  EMPTY_STRING: /^$/,
  NOT_EMPTY_STRING: /.+/,
});

const MAX_KEYWORDS_COUNT = 3;

const MAX_RESULTS_COUNT = 10;

const SCROLL_EVENT_THRESHOLD = 0.7;

const THROTTLE_TIME_IN_MS = 500;

const SNACKBAR_SHOW_TIME_IN_MS = 3000;

export {
  CLASSNAME,
  MAX_KEYWORDS_COUNT,
  MAX_RESULTS_COUNT,
  MAX_SAVED_VIDEOS_COUNT,
  MESSAGE,
  SNACKBAR_MESSAGE,
  SNACKBAR_SHOW_TIME_IN_MS,
  SCROLL_EVENT_THRESHOLD,
  THROTTLE_TIME_IN_MS,
  LOCAL_STORAGE_KEY,
  REGULAR_EXPRESSION,
};
