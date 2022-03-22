export const SEARCH_URL_BASE = 'https://pensive-fermat-630884.netlify.app/youtube/v3/search?';
export const MAX_SEARCH_RESULT = 10;

export const SAVED_VIDEO_PAGINATION_COUNT = 10;

export const VIDEO_LIST_URL_BASE = 'https://pensive-fermat-630884.netlify.app/youtube/v3/videos?';

export const MAX_SAVE_AMOUNT = 100;

export const ERROR_MESSAGES = Object.freeze({
  EXCEED_MAX_SAVE_AMOUNT: `저장된 비디오의 개수가 ${MAX_SAVE_AMOUNT}개를 초과했습니다.`,
  SERVER_ERROR: '서버에서 오류가 발생했습니다! 잠시 후 다시 시도해주세요.',
  NO_RESULT: '검색 결과가 없습니다! 다른 키워드로 검색해보세요.',
  NO_SEARCH_KEYWORD: '검색어를 입력해주세요!',
  NO_SAVED_VIDEOS: '저장된 영상이 없습니다!',
  DEFAULT: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
});

export const DELETE_CONFIRM_MESSAGE = '해당 영상의 저장을 취소합니다. 계속하시겠습니까?';

export const TAB_NAMES = {
  UNWATCHED: 'unwatched',
  WATCHED: 'watched',
};
