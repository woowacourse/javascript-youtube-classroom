export const SEARCH_URL_BASE =
  'https://boring-khorana-6a713d.netlify.app/youtube/v3/search?part=snippet';
export const MAX_SEARCH_RESULT = 10;

export const MAX_SAVE_AMOUNT = 100;
export const STORAGE_KEY = 'savedVideos';

export const ERROR_MESSAGES = Object.freeze({
  EXCEED_MAX_SAVE_AMOUNT: `저장된 비디오의 개수가 ${MAX_SAVE_AMOUNT}개를 초과했습니다.`,
  SERVER_MALFUNCTION: '서버에서 에러가 발생했습니다. 잠시 후 다시 시도하십시오.',
});
