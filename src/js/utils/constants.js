export const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3";
export const API = {
  GET: {
    SEARCH: "search",
  },
};

export const DOM_CONSTANTS = {
  ELEMENT: {
    BODY: "body",
    BUTTON: "button",
  },
  ID_SELECTOR: {
    SNACKBAR: "#snackbar",
    WATCHED_LATER_VIEW_BUTTON: "#watch-later-view-button",
    WATCHED_VIEW_BUTTON: "#watched-view-button",
    LIKED_VIEW_BUTTON: "#liked-view-button",
    EMPTY_IMG: "#empty-img",
    NOT_FOUND: "#not-found",
    SAVED_VIDEOS: "#saved-videos",
    SEARCH_BUTTON: "#search-button",
    SEARCH_MODAL: "#search-modal",
    SEARCH_MODAL_CLOSE: "#search-modal-close",
    SEARCH_FORM: "#search-form",
    SEARCH_RESULTS: "#search-results",
    SEARCH_RESULTS_INNER: "#search-results-inner",
    SKELETON_SEARCH_RESULTS: "#skeleton-search-results",
    SKELETON_UI_CONTAINER: "#skeleton-ui-container",
    HIDDEN_TARGET: "#hidden-target",
    KEYWORD_HISTORY: "#keyword-history",
    SAVED_VIDEO_COUNT: "#saved-video-count",
  },
  CLASS_NAME: {
    MODAL: "modal",
    JS_REMOVE_BTN: "js-remove-btn",
    ICON: "icon",
    D_NONE_HARD: "d-none-hard",
    OVERFLOW_HIDDEN: "overflow-hidden",
    OPEN: "open",
  },
  DATASET: {
    VIDEO_ID: "data-video-id",
    BUTTON_TYPE: {
      WATCHED: "watched",
      LIKED: "liked",
      DELETE: "delete",
    },
  },
  NAME: {
    SEARCH_KEYWORD: "search-keyword",
  },
};

export const VIDEO_VIEW_NAME = {
  WATCH_LATER: "watch-later",
  WATCHED: "watched",
  LIKED: "liked",
};

export const EMPTY_IMG = {
  SRC: {
    NOT_SAVED: "./src/images/status/not-saved.png",
    NOT_WATCHED: "./src/images/status/not-watched.png",
    NO_LIKED: "./src/images/status/no-liked.png",
  },
  ALT: {
    NO_VIDEOS: "동영상이 존재하지 않습니다.",
  },
  WIDTH: {
    DEFAULT: "300",
  },
};

export const CUSTOM_EVENTS = {
  LOAD_SEARCH_ALL: "loadSearchAll",
};

export const VIDEOS = {
  SEARCH_MAX_RESULT: 10,
  KEYWORD_HISTORY_LENGTH: 3,
  SAVED_VIDEOS_MAX_COUNT: 100,
  SKELETON_REPEAT_NUMBER: 8,
};

export const PALLET = {
  CYAN_100: "bg-cyan-100",
};

export const STORAGE_NAME = {
  KEYWORDS: "keywords",
  SAVED_VIDEOS: "saved_videos",
};

export const SUCCESS_MESSAGE = {
  SAVE_VIDEO: "동영상을 저장했습니다.",
  DELETE_VIDEO: "저장된 동영상을 삭제하였습니다.",
  WATCH_VIDEO: "동영상을 시청했습니다",
  CLEAR_WATCH_VIDEO_LOG: "볼 영상으로 이동합니다.",
  LIKE_VIDEO: "동영상을 좋아합니다.",
  DISLIKE_VIDEO: "좋아요를 취소합니다.",
};

export const ERROR_MESSAGE = {
  SAVE_COUNT_EXCEEDED_ERROR: `비디오 저장은 ${VIDEOS.SAVED_VIDEOS_MAX_COUNT}개까지만 가능합니다.`,
  SEARCH_ERROR: "동영상을 검색할 수 없습니다",
  SAVE_ERROR: "동영상 저장에 실패했습니다.",
  DELETE_ERROR: "동영상 삭제에 실패했습니다.",
  LIKE_ERROR: "좋아요 누르기에 실패했습니다.",
  DISLIKE_ERROR: "좋아요 취소에 실패했습니다.",
  INVALID_ACTION_ERROR: "유효하지 않은 동작입니다.",
  NOT_IMPLEMENTED: "준비중인 기능입니다.",
  CONNOT_FIND_SAVE_BUTTON_ERROR: "cannot find save button",
  CONNOT_FIND_ELEMENT_ERROR: "cannot find element",
  CONNOT_FIND_INDEX_OF_VIDEO: "cannot find index of video",
};

export const CONFIRM_MESSAGE = {
  DELETE: "정말로 삭제하시겠습니까?",
};

export const INVALID_DATE = "Invalid Date";
export const NULL_DATE = "----년 --월 --일";
