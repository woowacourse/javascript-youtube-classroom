const MAX_VIDEO_SAVE_COUNT = 100;
const MAX_SEARCH_TEXT_SAVE_COUNT = 3;
const GET_VIDEO_UNIT = 10;

const MESSAGE = {
  ASK_DELETE: '정말 삭제하시겠습니까?',
  ASK_ALL_CHECK: '모두 체크하시겠습니까?',
  ASK_ALL_DELETE: '정말 모두 삭제하시겠습니까?',
  ERROR_BLANK_SEARCH_INPUT: '검색어를 입력해주세요.',
  ERROR_GET_REQUEST: '서버와의 통신에 문제가 발생했습니다.',
  ERROR_EXCESS_API_QUOTA: 'API 할당량이 끝났습니다. 나중에 다시 시도해주세요.',
  ERROR_EXCESS_SAVE_COUNT: `동영상은 최대 ${MAX_VIDEO_SAVE_COUNT}개까지만 저장이 가능합니다.`,
  NOT_FOUND: '검색 결과가 없습니다.',
  OTHER_KEYWORD: '다른 키워드로 검색해보세요.',
  SAVE_COMPLETE: '저장되었습니다.',
  MODIFY_COMPLETE: '수정되었습니다.',
  NO_SAVED_VIDEO: '저장된 영상이 없습니다.',
};

const STORAGE_KEY = {
  VIDEO: 'video',
  RECENT_SEARCH: 'recentSearch',
};

const STATE = {
  WILL: false,
  WATCHED: true,
};

export {
  MAX_VIDEO_SAVE_COUNT,
  MAX_SEARCH_TEXT_SAVE_COUNT,
  GET_VIDEO_UNIT,
  MESSAGE,
  STORAGE_KEY,
  STATE,
};
