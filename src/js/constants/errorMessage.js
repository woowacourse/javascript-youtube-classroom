export const ERROR_MESSAGE = Object.freeze({
  EXCEED_API_REQUEST_COUNT: errorCode =>
    `주어진 API 요청 횟수를 초과하여, 동영상 정보를 불러올 수 없습니다. (Error code: ${errorCode})`,
  API_REQUEST_ERROR: errorCode => `동영상 정보를 불러올 수 없습니다. (Error code: ${errorCode})`,
});
