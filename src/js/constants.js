const REDIRECT_SERVER_HOST = 'https://trusting-yonath-35b2a1.netlify.app';

export const SEARCH_API = {
  URL: new URL('/dummy/youtube/v3/search', REDIRECT_SERVER_HOST),
  PARAMS: {
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    regionCode: 'kr',
    safeSearch: 'strict',
  },
};

export const VIDEO = {
  MAX_SAVABLE_COUNT: 10,
};

export const ERROR_MESSAGE = {
  EXCEED_MAX_SAVABLE_COUNT: `최대 저장 개수를 초과하였습니다. 동영상은 ${VIDEO.MAX_SAVABLE_COUNT}개까지 저장 가능합니다.`,
};
