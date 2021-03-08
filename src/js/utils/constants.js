export const STANDARD_NUMS = Object.freeze({
  MAX_SAVE_VIDEO_COUNT: 100,
  MAX_SAVE_KEYWORD_COUNT: 3,
  LOAD_CLIP_COUNT: 10,
});

export const ALERT_MESSAGE = Object.freeze({
  EMPTY_KEYWORD_INPUT: "검색어가 존재하지 않습니다. 검색어를 입력해주세요",
  OVER_MAX_SAVE_VIDEO_COUNT: `최대 저장 가능 영상 개수는 ${STANDARD_NUMS.MAX_SAVE_VIDEO_COUNT}개입니다.`,
});

export const STORAGE = Object.freeze({
  VIDEO_IDS: "videoIds",
});

export const SECTION = Object.freeze({
  MODAL: "modal",
  MAIN: "main",
});
