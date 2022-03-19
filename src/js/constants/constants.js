import { $ } from '../util/dom.js';

export const ELEMENTS = {
  SEARCH_RESULT: $('.search-result'),
  VIDEO_LIST: $('.video-list'),
  SAVED_VIDEO_LIST: $('.saved-video-list'),
};

export const MESSAGE = {
  ERROR: {
    EMPTY_INPUT: '빈값을 입력할 수 없습니다. 다시 입력해 주세요.',
  },
  CONFIRM: {
    CHECK_DELETE: '정말로 삭제하시겠습니까? 🗑',
  },
};

export const VIDEO = {
  MAX_SAVE_COUNT: 100,
  SEARCH_RESULT_COUNT: 10,
  THROTTLE_DELAY: 1000,
};

export const STORAGE_KEY = 'data';
