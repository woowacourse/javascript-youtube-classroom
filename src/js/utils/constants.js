export const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3";
export const API = {
  GET: {
    SEARCH: "search",
  },
};

export const VIDEOS = {
  SEARCH_MAX_RESULT: 10,
  KEYWORD_HISTORY_LENGTH: 3,
  SAVED_VIDEOS_MAX_COUNT: 100,
  SKELETON_REPEAT_NUMBER: 8,
};

export const PALLET = {
  CYAN_100: "bg-cyan-100",
};

export const STORAGE_NAME = {
  KEYWORDS: "keywords",
  SAVED_VIDEOS: "saved_videos",
};

export const SUCCESS_MESSAGE = {
  SAVE_VIDEO: "동영상을 저장했습니다.",
  DELETE_VIDEO: "저장된 동영상을 삭제하였습니다.",
  WATCH_VIDEO: "동영상을 시청했습니다",
  CLEAR_WATCH_VIDEO_LOG: "볼 영상으로 이동합니다.",
};

export const ERROR_MESSAGE = {
  SAVE_COUNT_EXCEEDED_ERROR: `비디오 저장은 ${VIDEOS.SAVED_VIDEOS_MAX_COUNT}개까지만 가능합니다.`,
  SEARCH_ERROR: "동영상을 검색할 수 없습니다",
  SAVE_ERROR: "동영상 저장에 실패했습니다.",
  DELETE_ERROR: "동영상 삭제에 실패했습니다.",
  INVALID_ACTION_ERROR: "유효하지 않은 동작입니다.",
  NOT_IMPLEMENTED: "준비중인 기능입니다.",
  CONNOT_FIND_SAVE_BUTTON_ERROR: "cannot find save button",
  CONNOT_FIND_ELEMENT_ERROR: "cannot find element",
  CONNOT_FIND_INDEX_OF_VIDEO: "cannot find index of video",
};

export const CONFIRM_MESSAGE = {
  DELETE: "정말로 삭제하시겠습니까?",
};

export const INVALID_DATE = "Invalid Date";
export const NULL_DATE = "----년 --월 --일";
