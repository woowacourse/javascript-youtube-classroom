export const SEARCH_KEYWORD_MIN_LENGTH = 2;
export const MAX_VIDEO_SAVE = 100;
export const MAX_DATA_FETCH_AT_ONCE = 10;
export const SCROLL_BUFFER_SECOND = 200;
export const SCROLL_BUFFER_HEIGHT = 80;

export const ERROR_MESSAGE = {
  SEARCH_KEYWORD_MIN_LENGTH: `검색 키워드는 ${SEARCH_KEYWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  MAX_VIDEO_SAVE: `저장 에러! 영상은 최대 ${MAX_VIDEO_SAVE}개만 저장할 수 있습니다.`,
  ALREADY_SAVE: '이미 저장한 동영상입니다',
  NO_MORE_API: 'API키를 모두 사용했습니다',
  SERVER_ERROR: '서버에 문제가 생겼습니다. 관리자에게 문의주세요',
  CANNOT_CHANGE_STATE: '저장 오류 발생! 영상을 전환할 수 없습니다.',
  CANNOT_SAVE: '저장 오류 발생! 영상을 삭제할 수 없습니다.',
};

export const ALERT_MESSAGE = {
  NO_MORE_SEARCH_RESULT: '마지막 검색결과까지 모두 출력되었습니다.',
  SAVED: '저장되었습니다',
  CHANGED_TO_WILL_WATCH: '볼 영상으로 전환되었습니다',
  CHANGED_TO_WATCHED: '본 영상으로 전환되었습니다',
  OFFLINE: '오프라인 상태입니다. 네트워크 연결을 확인해주세요',
};

export const REQUEST_PATH = 'youtube/v3/search';
export const HOST_URL = 'https://brave-lichterman-77e301.netlify.app/';
export const SECOND_HOST_URL = 'https://distracted-ritchie-97635e.netlify.app/';

export const FAKE_DATA = [
  {
    id: '3iM_06QeZi8',
    thumbnail: 'https://i.ytimg.com/vi/3iM_06QeZi8/mqdefault.jpg',
    title: "[IU] '내 손을 잡아(Hold My Hand)' Live Clip (2019 IU Tour Concert 'Love, poem')",
    channelName: '이지금 [IU Official]',
    publishedDate: '2020년 10월 21일',
    watched: false,
  },
];

export const SAVE_KEY = 'video';
