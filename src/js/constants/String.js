export const ERROR_MESSAGE = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요.',
  MAX_SAVE_VIDEO: '동영상은 최대 100개까지 저장할 수 있습니다.',
};

export const ACTION_TYPE = {
  UPDATE_SEARCH_KEYWORD: Symbol('사용자가 검색어를 입력하였을 시 발동하는 액션'),
  UPDATE_SEARCH_RESULT: Symbol('검색 시도 후 검색 결과 업데이트가 필요할 때 발동하는 액션'),
  UPDATE_SEARCH_LOADING_STATUS: Symbol('API 서버와 통신 중 로딩 상태로 변경하는 액션'),
  UPDATE_SAVE_LIST: Symbol('저장된 동영상 목록을 갱신하는 액션'),
  UPDATE_SAVE_LIST_FILTER: Symbol('저장된 동영상 목록의 출력 타입을 지정하는 액션'),
};
