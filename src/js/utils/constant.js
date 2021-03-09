export const YOUTUBE = {
  NUMBER_TO_LOAD: 10,
  MAXMIMUM_RECENT_KEYWORD_LENGTH: 3,
  MAXIMUM_SAVE_CLIPS: 100,
};

export const MESSAGE = {
  CONFIRM: {
    DELETE_CLIP: '해당 클립을 삭제하시겠습니까?',
  },
  NOTIFY: {
    DELETE_CLIP: '🗑️ 선택하신 클립을 삭제했습니다 🗑️',
    CHECK_WACTHED_CLIP: '✅ 선택하신 클립을 본 영상으로 이동시켰습니다 ✅',
    CHECK_UNWACTHED_CLIP: '☑️ 선택하신 클립을 볼 영상으로 이동시켰습니다 ☑️',
  },
  ERROR: {
    EXCEED_MAXIMUM_CLIP_COUNT:
      '최대 저장 가능 갯수를 초과했습니다. (최대 저장 가능 갯수: 100개)',
    ONLY_STRING_OR_ARRAY_CAN_BE_STORED_IN_LOCAL_STORAGE:
      'localStorage에는 String 또는 Array만 저장할 수 있습니다.',
    EMPTY_KEYWORD: '검색 키워드가 비어있습니다.',
  },
};

export const LOCAL_STORAGE_KEY = {
  CURRENT_KEYWORD: 'currentKeyword',
  RECENT_KETWORDS: 'recentKeywords',
  NEXT_PAGE_TOKEN: 'nextPageToken',
  SAVED_CLIPS: 'savedClips',
  RECENT_SEARCH_RESULTS: 'recentSearchResults',
  CURRENT_TAB: 'currentTab',
};

export const LOCAL_STORAGE_VALUE = {
  WATCHED: 'watched',
  UNWATCHED: 'unWatched',
};

export const BASE_URL =
  'https://zen-cray-600581.netlify.app/.netlify/functions/lambda/search';
