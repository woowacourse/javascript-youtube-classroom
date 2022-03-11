export const QUERY_OPTIONS = {
  SEARCH: {
    part: 'snippet',
    type: 'video',
    maxResults: 10,
  },
};

export const SAVED_VIDEO = {
  KEY: 'savedVideos',
  SAVE_LIMIT: 100,
};

export const ERROR_MESSAGES = {
  REQUEST_FAIL: 'API 요청에 실패했습니다.',
  SAVED_VIDEOS_OUT_OF_LIMIT: `영상 저장에 실패했습니다. 영상은 ${SAVED_VIDEO.SAVE_LIMIT}개까지 저장할 수 있습니다.`,
};

export const INTERSECTION_OBSERVER = {
  ROOT_MARGIN: {
    NO_MARGIN: '0px',
  },
  THRESHOLD: {
    IMMEDIATELY: 0,
    FULLY_EXPOSED: 1,
  },
};
