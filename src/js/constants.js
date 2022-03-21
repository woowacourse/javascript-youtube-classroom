const RULES = {
  MAX_VIDEO_AMOUNT_PER_REQUEST: 10,
  MAX_STORED_VIDEO_AMOUNT: 100,
};

const ERROR_MESSAGE = {
  API_CALLS_QUOTA_EXCEEDED: 'api 할당량 초과입니다.\n매일 오후 5시에 api 할당량이 초기화 됩니다.',
  EMPTY_KEYWORD: '검색어를 입력해 주세요.',
  FULL_STORAGE: '저장공간이 가득 찼습니다.\n최대 100개까지 저장 가능합니다.',
  NOT_RESULT: '검색 결과가 없습니다.'
};

const THROTTLE_PENDING_MILLISECOND = 500;

const DELETE_CONFIRM_MESSAGE = '삭제 하시겠습니까?';

const EMPTY_VIDEO_MESSAGE = '영상이 없습니다.';

export {
  RULES,
  THROTTLE_PENDING_MILLISECOND,
  ERROR_MESSAGE,
  DELETE_CONFIRM_MESSAGE,
  EMPTY_VIDEO_MESSAGE
};
