export const SEARCH_KEYWORD_MIN_LENGTH = 2;
export const MAX_VIDEO_SAVE = 100;
export const MAX_DATA_FETCH_AT_ONCE = 10;

export const ERROR_MESSAGE = {
  SEARCH_KEYWORD_MIN_LENGTH: `검색 키워드는 ${SEARCH_KEYWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  MAX_VIDEO_SAVE: `저장 에러! 영상은 최대 ${MAX_VIDEO_SAVE}개만 저장할 수 있습니다.`,
  ALREADY_SAVED_VIDEO: '이미 저장된 비디오 입니다.',
  CAN_NOT_UPDATE_ON_NOT_SAVED_VIDEO: '저장된 비디오가 아닙니다. 정보를 업데이트 할 수 없습니다.',
  CAN_NOT_DELETE_ON_NOT_SAVED_VIDEO: '저장된 비디오가 아닙니다. 삭제할 수 없습니다.',
  FAIL_TO_READ_SAVED_VIDEO_INFO: '저장된 영상 정보를 가져오는데 실패했습니다.',
};

export const GUIDE_MESSAGE = {
  NO_MORE_SEARCH_RESULT: '마지막 검색결과까지 모두 출력되었습니다.',
  CONFIRM_DELETE: '정말 삭제하시겠습니까?',
};

export const RESULT = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}

export const EVENT = {
  UPDATE_SEARCH_STATE: 'updateSearchState',
  UPDATE_SAVED_VIDEO_LIST: 'updateSavedVideoList',
}
