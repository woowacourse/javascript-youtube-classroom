export const MAX_SAVE_COUNT = 100;

export const LOAD_VIDEOS_COUNT = 10;

export const ALERT_MESSAGE = {
  EXCEED_MAX_SAVE_VOLUME: `동영상은 최대 ${MAX_SAVE_COUNT}개까지 저장할 수 있습니다.`,
};

export const EXCEPTION_MESSAGE = {
  403: 'Youtube API 할당량을 모두 사용했습니다.<br>매일 17시에 초기화됩니다.',
  200: '검색 결과가 없습니다.<br>다른 키워드로 검색해보세요',
  OTHERS: 'Sorry, Something went wrong',
  NO_WATCHED_VIDEO: '본 영상이 없어요!',
  NO_WATCHING_VIDEO: '볼 영상이 없어요!',
};
