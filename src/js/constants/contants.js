const REDIRECT_SERVER_HOST = 'https://youtube-classroom-project.netlify.app';

const MAX_VIDEO_REQUEST_COUNT = 12;
const MAX_VIDEO_LIST_LENGTH = 108;
const MAX_SAVE_VIDEO_COUNT = 100;

const THROTTLE_TIME_INTERVAL = 300;

const BUTTON_SAVED_TEXT = '저장됨';

const SEARCH_MODAL_BUTTON_ID = 'search-modal-button';

const CLASSNAME = {
  VIDEO_SAVE_BUTTON: 'video-item__save-button',
  VIDEO_CHECK_BUTTON: 'video-item__check-button',
  VIDEO_DELETE_BUTTON: 'video-item__delete-button',

  SELECTED_TAB_BUTTON: 'selected',
  HIDE_ELEMENT: 'hide',
  SKELETON_ELEMENT: 'skeleton',
};

const VIDEO_ID_LIST_KEY = 'VIDEO_ID_LIST';

const ERROR_MESSAGE = {
  CANNOT_GET_YOUTUBE_VIDEO: '동영상 가져오기에 실패했습니다. 개발자에게 문의해주세요.',
  CANNOT_SEARCH_EMPTY: '공백은 검색할 수 없습니다.',
  CANNOT_SAVE_VIDEO_ANYMORE: `${MAX_SAVE_VIDEO_COUNT}개 이상 저장할 수 없습니다.`,
};

const DELETE_CONFIRM_MESSAGE = (videoTitle) => `'${videoTitle}'을(를) 삭제하시겠습니까?`;

export {
  ERROR_MESSAGE,
  MAX_VIDEO_REQUEST_COUNT,
  MAX_VIDEO_LIST_LENGTH,
  MAX_SAVE_VIDEO_COUNT,
  BUTTON_SAVED_TEXT,
  VIDEO_ID_LIST_KEY,
  REDIRECT_SERVER_HOST,
  SEARCH_MODAL_BUTTON_ID,
  CLASSNAME,
  DELETE_CONFIRM_MESSAGE,
  THROTTLE_TIME_INTERVAL,
};
