export const MAX_RESULT = 10;

export const VALUES = {
  MAXIMUM_VIDEO_SAVE_COUNT: 100,
};

export const ERROR_MESSAGE = {
  MAXIMUM_VIDEO_SAVE_COUNT_ERROR:
    '동영상은 100개까지 저장할 수 있습니다. 저장된 동영상을 지워주세요.',
  EXCEED_API_REQUEST_COUNT: (error) =>
    `제한된 API 요청 횟수를 초과하여, 동영상을 불러올 수 없습니다. (Error code : ${error})`,
  API_REQUEST_ERROR: (error) =>
    `동영상 요청에 실패하여, 동영상을 불러올수 없습니다. (Error code : ${error})`,
};

export const LOCALSTORAGE_KEYS = {
  VIDEOS: 'videos',
  SEARCH_HISTORY: 'searchHistory',
};
