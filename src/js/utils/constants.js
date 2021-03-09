export const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?';
export const VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos?';

export const VALUE = {
  KEYWORD_COUNT: 3,
  CLIPS_PER_SCROLL: 10,
  THROTTLE_TIME: 1000,
  MAX_SAVED_COUNT: 100,
  SNACKBAR_TIME: 3000,
};

export const ALERT_MESSAGES = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요',
  OVER_SAVED_VIDEO_COUNT: '동영상 저장은 최대 100개까지 가능합니다',
};

export const STORE_KEYS = {
  SELECTED_TAB: 'selectedTab',
  SAVED_VIDEO_IDS: 'savedVideoIds',
  RECENT_KEYWORDS: 'recentKeywords',
  WATCHED_VIDEO_IDS: 'watchedVideoIds',
};

export const SNACKBAR_MESSAGES = {
  SAVE_VIDEO: {
    SUCCESS: '동영상이 저장되었읍니다',
    FAIL: '동영상 저장에 실패했읍니다',
  },
};
