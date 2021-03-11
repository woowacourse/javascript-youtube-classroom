export const STANDARD_NUMS = Object.freeze({
  MAX_SAVE_VIDEO_COUNT: 100,
  MAX_SAVE_KEYWORD_COUNT: 3,
  LOAD_CLIP_COUNT: 10,
});

export const ALERT_MESSAGE = Object.freeze({
  EMPTY_KEYWORD_INPUT: "검색어가 존재하지 않습니다. 검색어를 입력해주세요",
  OVER_MAX_SAVE_VIDEO_COUNT: `최대 저장 가능 영상 개수는 ${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개입니다.`,
});

export const STORAGE = Object.freeze({
  VIDEO_IDS: "videoIds",
});

export const SECTION = Object.freeze({
  MODAL: "modal",
  MAIN: "main",
});

export const CLASS_NAME = Object.freeze({
  MENU_SECTION: "menu-section",
  WATCH_LATER_BTN: "menu-section__watch-later-btn",
  WATCHED_BTN: "menu-section__watched-btn",
  VIDEO_SEARCH_BTN: "menu-section__video-search-btn",

  SEARCH_MODAL: "search-modal",
  SEARCH_MODAL_INPUT: "search-modal__input",
  SEARCH_MODAL_BTN: `search-modal__btn`,
  SEARCH_MODAL_VIDEO_WRAPPER: "search-modal__video-wrapper",
  SCROLL_AREA: "search-modal__scroll-area",
  MORE_AREA: "search-modal__more-area",
  MODAL_CLOSE: "modal-close",
  SAVED_VIDEO_COUNT: "search-modal__saved-video-count",
  KEYWORD_HISTORY: "search-modal__keyword-history",
  KEYWORD: "keyword-history__keyword",
  CLIP_SAVE_BTN: "clip__save-btn",
  CLIP: "clip",

  SKELETON: "skeleton",
  NO_RESULT_IMAGE: "no-result-image",
});
