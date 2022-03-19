export const LOCALSTORAGE_KEY_SAVE = 'save';

export const LOCALSTORAGE_KEY_WATCHED = 'watched';

export const ERROR_403 = '403 Error';

export const REQUEST_VIDEO_QUANTITY = 10;

export const MAX_STOARGE_CAPACITY = 100;

export const HOST_URL = 'https://donkeykong.netlify.app/';

export const REQUEST_PATH = 'youtube/v3/search';

export const SEARCH_VIDEO_REQUEST_PATH = 'youtube/v3/videos';

export const ERROR_MESSAGE = {
  EXCEED_REQUEST_CAPACITY_ERROR: '오늘의 할당량을 모두 사용했습니다😅',

  EXCEED_STORAGE_CAPACITY_ERROR: '최대 저장 개수는 100개입니다.',

  NO_INPUT: '검색어를 입력해주세요',

  RESPONSE_DENIED: '검색을 불러오는 데 문제가 발생하였습니다',

  NO_ID: '아이디가 존재하지 않습니다',
};

export const EVENT_TYPE = {
  CHANGE_TAB: 'change-tab',
  CHANGE_VIDEO_STATUS: 'change-video-status',
  DELETE_VIDEO: 'delete-video',
  LOAD_INITIAL_VIDEO: 'load-initial-video',
  SAVE_VIDEO: 'save-video',
  SEARCH_VIDEO: 'search-video',
};

export const MENU_STATE = {
  NOT_WATCHED_MENU: 'not-watched-tab-menu',
  WATCHED_MENU: 'watched-tab-menu',
};
