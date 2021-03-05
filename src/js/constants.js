export const ALERT_MESSAGE = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요',
  VIDEO_SAVED: '선택한 동영상을 저장했습니다',
};

export const API_SETTINGS = {
  MAX_RESULTS: 10,
};

export const SELECTORS = {
  CLASS: {
    MODAL_CLOSE: '.modal-close',
    MODAL: '.modal',
    MODAL_INNER: '.modal-inner',
    WATCH_LIST_CONTAINER: '.watch-list-container',
    WATCH_LIST: '.watch-list',
    YOUTUBE_SEARCH_FORM_CONTAINER: '.youtube-search-form-container',
    YOUTUBE_SEARCH_RESULT_LIST: '.youtube-search-result-list',
    YOUTUBE_SEARCH_RESULT: '.youtube-search-result',
    BTN_SAVE: '.btn-save',
    VIDEO_TITLE: '.video-title',
    RECENT_KEYWORD_LIST: '.recent-keyword-list',
    SAVED_VIDEO_COUNT: '.saved-video-count',
  },
  ID: {
    SEARCH_BUTTON: '#search-button',
    SNACKBAR: '#snackbar',
    YOUTUBE_SEARCH_FORM: '#youtube-search-form',
    YOUTUBE_SEARCH_KEYWORD_INPUT: '#youtube-search-keyword-input',
  },
  STATUS: {
    MODAL_OPEN: 'open',
    SNACKBAR_SHOW: 'show',
    HIDDEN: 'hidden',
  },
};

export const LOCAL_STORAGE_KEYS = {
  WATCH_LIST: 'watchList',
  RECENT_KEYWORD_LIST: 'recentKeywordList',
};
