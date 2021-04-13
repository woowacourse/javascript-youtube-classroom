export const STANDARD_NUMS = Object.freeze({
  MAX_SAVE_VIDEO_COUNT: 100,
  MAX_SAVE_KEYWORD_COUNT: 3,
  LOAD_CLIP_COUNT: 10,
  SNACKBAR_DELAY: 1000,
});

export const ALERT_MESSAGE = Object.freeze({
  EMPTY_KEYWORD_INPUT: "검색어가 존재하지 않습니다. 검색어를 입력해주세요",
  OVER_MAX_SAVE_VIDEO_COUNT: `최대 저장 가능 영상 개수는 ${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개입니다.`,
});

export const CONFIRM_MESSAGE = Object.freeze({
  DELETE: "정말 삭제하시겠습니까?",
});

export const SNACKBAR_MESSAGE = Object.freeze({
  DELETE: "성공적으로 삭제되었습니다.",
  SAVE: "성공적으로 저장되었습니다.",
  MOVE: section => `${section} 영상으로 이동되었습니다.`,
  LIKE: "좋아하는 영상 리스트에 추가했습니다.",
  UNLIKE: "좋아하는 영상 리스트에서 삭제했습니다.",
});

export const STORAGE = Object.freeze({
  SAVED_VIDEOS: "savedVideos",
  LIKED_VIDEOS: "likedVideos",
});

export const SECTION = Object.freeze({
  MODAL: "modal",
  MAIN: "main",
});

export const MENU = Object.freeze({
  WATCH_LATER: "watch-later",
  WATCHED: "watched",
  LIKED: "liked",
});

export const COLOR = Object.freeze({
  CLICKED: "bg-cyan-100",
});

export const CLASS_NAME = Object.freeze({
  MENU_SECTION: "menu-section",
  MENU_TOGGLE_BTN: "menu-toggle-btn",
  SEARCH_BTN: "search-btn",
  WATCH_LATER_BTN: "menu-section__watch-later-btn",
  WATCHED_BTN: "menu-section__watched-btn",
  LIKED_BTN: "menu-section__liked-btn",
  VIDEO_SEARCH_BTN: "menu-section__video-search-btn",

  SEARCH_MODAL: "search-modal",
  SEARCH_MODAL_INPUT: "search-modal__input",
  SEARCH_MODAL_BTN: `search-modal__btn`,
  SEARCH_MODAL_VIDEO_WRAPPER: "search-modal__video-wrapper",
  SEARCH_MODAL_NO_RESULT_WRAPPER: "search-modal__no-result-wrapper",
  SCROLL_AREA: "search-modal__scroll-area",
  MORE_AREA: "search-modal__more-area",
  MODAL_CLOSE: "modal-close",
  SAVED_VIDEO_COUNT: "search-modal__saved-video-count",
  KEYWORD_HISTORY: "search-modal__keyword-history",
  KEYWORD: "keyword-history__keyword",
  CLIP_SAVE_BTN: "clip__save-btn",
  CLIP: "clip",

  VIDEO_VIEW: "video-view",
  VIDEO_VIEW_VIDEO_WRAPPER: "video-view__video-wrapper",
  CLIP_ACTIONS: "clip__actions",
  WATCHED_CHECK: "clip__watched-check",
  LIKED_CHECK: "clip__liked-check",
  TRASH_CAN: "clip__trash-can",

  SKELETON: "skeleton",
  NO_RESULT_IMAGE: "no-result-image",
  NO_SAVED_VIDEO_IMAGE: "no-saved-video-image",
  SNACKBAR: "snackbar",
});
