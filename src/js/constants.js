export const SEARCH_KEYWORD_MIN_LENGTH = 2;
export const MAX_VIDEO_SAVE = 10;
export const MAX_DATA_FETCH_AT_ONCE = 10;
export const SCROLL_BUFFER_SECOND = 200;
export const SCROLL_BUFFER_HEIGHT = 50;

export const ERROR_MESSAGE = {
  SEARCH_KEYWORD_MIN_LENGTH: `검색 키워드는 ${SEARCH_KEYWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  MAX_VIDEO_SAVE: `저장 에러! 영상은 최대 ${MAX_VIDEO_SAVE}개만 저장할 수 있습니다.`,
  ALREADY_SAVE: '이미 저장한 동영상입니다',
};

export const ALERT_MESSAGE = {
  NO_MORE_SEARCH_RESULT: '마지막 검색결과까지 모두 출력되었습니다.',
};

export const REQUEST_PATH = 'youtube/v3/search';
export const HOST_URL = 'https://brave-lichterman-77e301.netlify.app/';

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
