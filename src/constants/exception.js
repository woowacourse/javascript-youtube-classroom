const EXCEPTION = Object.freeze({
  EMPTY_ERROR_MESSAGE: '입력된 검색어가 없습니다. 검색어를 입력해주세요.',
  NOT_FOUND_ERROR_MESSAGE: '검색된 결과가 없습니다. 다른 검색어를 입력해주세요.',
  EXCEED_LIMIT_ERROR_MESSAGE:
    '저장된 영상의 개수가 100개를 초과하여 저장되지 않았습니다. 100개 이하의 영상만 저장해주세요.',
});

export default EXCEPTION;
