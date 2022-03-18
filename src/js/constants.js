export const VIDEO = {
  MAX_RESULT_PER_SEARCH: 10,
  MAX_SAVABLE_COUNT: 100,
};

export const ERROR_MESSAGE = {
  FAIL_TO_REQUEST_API: '영상을 불러올 수 없습니다! 잠시 후 다시 시도해 주세요.',
  EXCEED_MAX_SAVABLE_COUNT: `최대 저장 개수를 초과하였습니다. 동영상은 ${VIDEO.MAX_SAVABLE_COUNT}개까지 저장 가능합니다.`,
};

const REDIRECT_SERVER_HOST = 'https://zen-elion-c06022.netlify.app';

export const SEARCH_API = {
  URL: new URL('/youtube/v3/search', REDIRECT_SERVER_HOST),
  PARAMS: {
    part: 'snippet',
    type: 'video',
    maxResults: VIDEO.MAX_RESULT_PER_SEARCH,
    regionCode: 'kr',
    safeSearch: 'strict',
  },
};
