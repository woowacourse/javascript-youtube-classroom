const MAX_VIDEO_REQUEST_COUNT = 10;
const MAX_VIDEO_LIST_LENGTH = 100;
const MAX_SAVE_VIDEO_COUNT = 100;

const BUTTON_SAVED_TEXT = '저장됨';

const VIDEO_ID_LIST_KEY = 'VIDEO_ID_LIST';

const REDIRECT_SERVER_HOST = 'https://www.googleapis.com'; //'https://youtube-classroom-project.netlify.app';

const ERROR_MESSAGE = {
  CANNOT_GET_YOUTUBE_VIDEO: '[404] 개발자에게 문의하세요.',
  CANNOT_SEARCH_EMPTY: '공백은 검색할 수 없습니다.',
  CANNOT_SAVE_VIDEO_ANYMORE: `${MAX_SAVE_VIDEO_COUNT}개 이상 저장할 수 없습니다.`,
};

export {
  ERROR_MESSAGE,
  MAX_VIDEO_REQUEST_COUNT,
  MAX_VIDEO_LIST_LENGTH,
  MAX_SAVE_VIDEO_COUNT,
  BUTTON_SAVED_TEXT,
  VIDEO_ID_LIST_KEY,
  REDIRECT_SERVER_HOST,
};
