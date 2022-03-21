export const ERROR_MESSAGE = {
  EMPTY_SEARCH_KEYWORD: '검색어를 입력해주세요.',
  MAX_SAVE_VIDEO: '동영상은 최대 100개까지 저장할 수 있습니다.',
};

export const ALERT_MESSAGE = {
  SAVE_LIST_CONFIRM_REMOVE: '정말 해당 동영상을 제거하시겠습니까?',
  SAVE_LIST_REMOVE: '볼 동영상 목록에서 제거되었습니다.',
  SAVE_LIST_ADD: '볼 동영상 목록에 저장되었습니다',
  SAVE_LIST_STATE_UPDATE: '동영상의 상태를 변경하였습니다.',
};

export const ACTION_TYPE = {
  UPDATE_SEARCH_KEYWORD: Symbol('사용자가 검색어를 입력하였을 시 발동하는 액션'),
  UPDATE_SEARCH_RESULT: Symbol('검색 시도 후 검색 결과 업데이트가 필요할 때 발동하는 액션'),
  UPDATE_SEARCH_LOADING_STATUS: Symbol('API 서버와 통신 중 로딩 상태로 변경하는 액션'),
  UPDATE_SAVE_LIST: Symbol('저장된 동영상 목록을 갱신하는 액션'),
  UPDATE_SAVE_LIST_FILTER: Symbol('저장된 동영상 목록의 출력 타입을 지정하는 액션'),
};
