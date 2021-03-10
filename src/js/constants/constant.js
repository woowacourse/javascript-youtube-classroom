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
  SAVE_VIDEO_BUTTON: '.js-save-button',
  VIDEO_IFRAME: '.clip iframe',
  RECENT_KEYWORDS: '#recent-keywords',
  MY_VIDEO_INFOS: '#my-video-infos',
};

export const CLASS = {
  SKELETON: 'skeleton',
  INVISIBLE: 'invisible',
};

export const REDIRECT_HOST = 'https://ddongule.netlify.app/youtube/v3/search?';

export const URL = {
  YOUTUBE_SEARCH: 'https://www.googleapis.com/youtube/v3/search?',
  YOUTUBE_VIDEOS: 'https://www.googleapis.com/youtube/v3/videos?',
  DUMMY_SEARCH: 'https://dawon.pythonanywhere.com/videos/',
};

export const ERROR_MESSAGE = {
  OVER_MAX_VIDEO_LENGTH: '볼 영상은 최대 100개까지만 저장할 수 있습니다!',
};
