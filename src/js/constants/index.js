export const YOUTUBE_API_REQUEST_COUNT = 10;

export const MAX_DATABASE_CAPACITY = 100;

export const SELECTOR = {
  SEARCH_MODAL_BUTTON: '#search-modal-button',
  SEARCH_MODAL: '#search-modal',
  MODAL_BACKGROUND: '#modal-background',
  SEARCH_FORM: '#search-form',
  SEARCH_INPUT_KEYWORD: '#search-input-keyword',
  VIDEOS: '#videos',
  EMPTY_SCREEN: '#empty-screen',
  APP: '#app',
  SEEN_BUTTON: '#seen-button',
  UNSEEN_BUTTON: '#unseen-button',
  UNSEEN_EMPTY_SCREEN: '#unseen-empty-screen',
  UNSEEN_VIDEOS: '#unseen-videos',
};

export const ERROR_MESSAGE = {
  EMPTY_KEYWORD: '검색어를 입력해주세요!',
  FULL_OF_DATABASE: `${MAX_DATABASE_CAPACITY}개보다 많이 저장할 수 없습니다.`,
};

export const REDIRECT_SERVER_HOST = {
  REAL: 'https://sad-mcclintock-e1eeea.netlify.app/youtube/v3/search',
  DUMMY: 'https://sad-mcclintock-e1eeea.netlify.app/dummy/youtube/v3/search',
};

export const DATABASE_VIDEO_KEY = 'videos';
