export const SEARCH = {
  RECENT_KEYWORD_MAX_LENGTH: 3,
  FETCH_VIDEO_LENGTH: 10,
};

export const STORAGE = {
  MAX_SAVED_VIDEO_LENGTH: 100,
  KEY_MY_VIDEO: 'myVideo',
  KEY_KEYWORDS: 'keywords',
};

export const SELECTOR = {
  SEARCH_VIDEO_WRAPPER: '#search-video-wrapper',
  SEARCH_YOUTUBE_FORM: '#search-youtube-form',
  SEARCH_YOUTUBE_INPUT: '#search-youtube-input',
  SEARCH_NOT_FOUND: '#search-not-found',
  SEARCH_MODAL_BUTTON: '#search-modal-button',
  SAVED_VIDEO_WRAPPER: '#saved-video-wrapper',
  SAVED_NOT_FOUND: '#saved-not-found',
  WATCHED_VIDEOS_BUTTON: '#watched-videos-button',
  SAVE_VIDEO_BUTTON: '.js-save-button',
  VIDEO_IFRAME: '.clip iframe',
  RECENT_KEYWORDS: '#recent-keywords',
  MY_VIDEO_LENGTH: '#my-video-length',
  MODAL: '.modal',
  CLIP: '.clip',
  MODAL_INNER: '.modal-inner',
  MODAL_CLOSE: '.modal-close',
  VIDEO_INFO_BUTTONS: '.video-info-buttons',
  TO_WATCH_VIDEOS_BUTTON: '#towatch-videos-button',
  SNACK_BAR: '#snackbar',
};

export const CLASS = {
  SKELETON: 'skeleton',
  INVISIBLE: 'invisible',
  SHOW: 'show',
  WATCHED: 'watched',
  DELETE: 'delete',
  OPACITY_HOVER: 'opacity-hover',
  SAVE_BUTTON: 'js-save-button',
  OPEN: 'open',
  BG_CYAN: 'bg-cyan-100',
};

export const REDIRECT_HOST = 'https://ddongule.netlify.app/youtube/v3/search?';

export const URL = {
  YOUTUBE_SEARCH: 'https://www.googleapis.com/youtube/v3/search?',
  YOUTUBE_VIDEOS: 'https://www.googleapis.com/youtube/v3/videos?',
  DUMMY_SEARCH: 'https://dawon.pythonanywhere.com/videos/',
};

export const ERROR_MESSAGE = {
  OVER_MAX_VIDEO_LENGTH: '볼 영상은 최대 100개까지만 저장할 수 있습니다!',
  FAILED_GET_ITEM: '데이터를 불러오는중에 오류가 발생했습니다',
};

export const SNACK_BAR = {
  DELETE_MESSAGE: '영상을 목록에서 제거했습니다.',
  SAVED_MESSAGE: '영상을 저장했습니다.',
  LIST_MODIFIED_MESSAGE: '해당 영상의 저장 목록 위치를 변경했습니다.',
  VISIBLE_TIME: 3000,
};

export const CONFIRM_MESSAGE = {
  DELETE_VIDEO: '정말로 영상을 삭제하시겠습니까?',
};
