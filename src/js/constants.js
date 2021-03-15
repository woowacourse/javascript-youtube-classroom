export const SETTINGS = {
  MAX_VIDEO_COUNT: 100,
};

export const ALERT_MESSAGE = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요',
  VIDEO_SAVED: '선택한 동영상을 저장했습니다',
  CONFIRM_DELETE: '정말 삭제하시겠습니까?',
  VIDEO_MOVED_WATCHED_LIST: '영상을 [본 영상] 목록으로 옮겼습니다',
  VIDEO_MOVED_TO_WATCH_LIST: '영상을 [볼 영상] 목록으로 옮겼습니다',
  VIDEO_DELETED: '영상이 삭제되었습니다.',
  MAX_VIDEO_COUNT_EXCEEDED: `영상은 최대 ${SETTINGS.MAX_VIDEO_COUNT}개까지만 저장할 수 있습니다.`,
  VIDEO_LIKED: '영상을 [좋아요 표시한 영상] 목록에 포함시켰습니다.',
  VIDEO_LIKE_CANCELED: '영상을 [좋아요 표시한 영상] 목록에서 제외하였습니다.',
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
    YOUTUBE_SEARCH_RESULT_CONTAINER: '.youtube-search-result-container',
    YOUTUBE_SEARCH_RESULT: '.youtube-search-result',
    BTN_SAVE: '.btn-save',
    VIDEO_TITLE: '.video-title',
    RECENT_KEYWORD_LIST: '.recent-keyword-list',
    SAVED_VIDEO_COUNT: '.saved-video-count',
    NO_VIDEO: '.no-video',
    CLIP: '.clip',
    WATCHED: '.watched',
    LIKE: '.like',
    COMMENT: '.comment',
    DELETE: '.delete',
    TO_WATCH_LIST_BUTTON: '.to-watch-list-button',
    WATCHED_LIST_BUTTON: '.watched-list-button',
    LIKED_LIST_BUTTON: '.liked-list-button',
    SENTINEL: '.sentinel',
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

export const SERACH_RESULT = {
  SKELETON_UI_COUNT: 8,
};

export const MENU = {
  WATCHED: 'watched',
  TO_WATCH: 'toWatch',
  LIKED: 'liked',
};
