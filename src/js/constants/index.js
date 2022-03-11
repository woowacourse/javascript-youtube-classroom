const MAX_SAVE_COUNT = 100;
const GET_VIDEO_UNIT = 10;

const MESSAGE = {
  ERROR_BLANK_SEARCH_INPUT: '검색어를 입력해주세요.',
  ERROR_GET_REQUEST: '서버와의 통신에 문제가 발생했습니다.',
  ERROR_EXCESS_SAVE_COUNT: `동영상은 최대 ${MAX_SAVE_COUNT}개까지만 저장이 가능합니다.`,
  NOT_FOUND: '검색 결과가 없습니다.',
  OTHER_KEYWORD: '다른 키워드로 검색해보세요.',
  SAVE_COMPLETE: '저장되었습니다.',
};

const STORAGE_KEY = 'videoId';

export { MAX_SAVE_COUNT, GET_VIDEO_UNIT, MESSAGE, STORAGE_KEY };
