export const YOUTUBE_SEARCH_ACTION = {
  UPDATE_SEARCH_KEYWORD: 'UPDATE_SEARCH_KEYWORD',
  UPDATE_SEARCH_RESULT_REQUEST: 'UPDATE_SEARCH_RESULT_REQUEST',
  UPDATE_SEARCH_RESULT_SUCCESS: 'UPDATE_SEARCH_RESULT_SUCCESS',
  UPDATE_SEARCH_RESULT_FAIL: 'UPDATE_SEARCH_RESULT_FAIL',
};

export const UI_ACTION = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SELECT_PAGE: 'SELECT_PAGE',
};

export const PAGE_NAME = {
  WATCH_LATER: 'watchLater',
  WATCHED: 'watched',
};

export const MESSAGE = {
  SERVER_ERROR: '서버에서 에러가 발생했어요!',
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요!',
  MAX_SAVE_VIDEO: '동영상은 최대 100개까지 저장할 수 있습니다.💦',
  SAVE_COMPLETE: '성공적으로 저장되었습니다!🥳',
  CONFIRM_REMOVE_VIDEO: '정말 삭제하시겠습니까?',
  REMOVE_COMPLETE: '동영상이 삭제되었습니다.👻',
};

export const YOUTUBE_SETTING = {
  URI: 'https://www.googleapis.com/youtube/v3/search',
  MAX_VIDEO_NUMBER: 10,
  MAX_SAVE_NUMBER: 100,
};

export const EVENT_TYPE = {
  CLICK: 'click',
  INPUT: 'input',
  SUBMIT: 'submit',
};

export const SNACKBAR_TYPE = {
  ERROR: 'ERROR',
  ALERT: 'ALERT',
};
