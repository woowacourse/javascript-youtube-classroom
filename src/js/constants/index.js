const MAX_SAVE_COUNT = 100;

const MESSAGE = {
  ERROR_BLANK_SEARCH_INPUT: '검색어를 입력해주세요.',
  ERROR_GET_REQUEST: '서버와의 통신에 문제가 발생했습니다.',
  ERROR_EXCESS_SAVE_COUNT: `동영상은 최대 ${MAX_SAVE_COUNT}개까지만 저장이 가능합니다.`,
  NOT_FOUND: '검색 결과가 없습니다.',
  OTHER_KEYWORD: '다른 키워드로 검색해보세요.',
  SAVE_SUCCESS: '저장되었습니다.',
  SAVE_FAILURE: '저장에 실패하였습니다.',
};

const STORAGE_KEY = 'savedVideoList';

const SNACK_BAR_SHOWING_TIME_IN_MS = 2000;

const INTERSECTION_RATIO = 0.5;

export { MAX_SAVE_COUNT, MESSAGE, STORAGE_KEY, SNACK_BAR_SHOWING_TIME_IN_MS, INTERSECTION_RATIO };
