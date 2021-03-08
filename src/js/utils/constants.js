export const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?';
export const VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos?';

export const VALUE = {
  KEYWORD_COUNT: 3,
  CLIPS_PER_SCROLL: 10,
  THROTTLE_TIME: 1000,
  MAX_SAVED_COUNT: 100,
};

export const ALERT_MESSAGES = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요',
  OVER_SAVED_VIDEO_COUNT: '동영상 저장은 최대 100개까지 가능합니다',
};

export const STORAGE_KEYS = {
  RECENT_KEYWORDS: 'recentKeywords',
  SAVED_VIDEO_IDS: 'savedVideoIds',
};
