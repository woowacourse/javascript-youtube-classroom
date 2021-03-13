export const VALUES = {
  MAXIMUM_VIDEO_SAVE_COUNT: 100,
  MAXIMUM_SEARCH_HISTORY_COUNT: 3,
  MAXIMUM_SEARCH_VIDEO_COUNT: 10,
};

export const MESSAGES = {
  CONFIRM: {
    DELETE: '정말로 삭제하시겠습니까? 되돌릴 수 없습니다.',
  },
  ACTION_SUCCESS: {
    WATCHED_STATE_SETTING: '설정이 완료되었습니다.',
    LIKEY_STATE_SETTING: '좋아요 👍를 누르셨습니다.',
    DELETE: '정상적으로 삭제되었습니다.',
  },
};

export const ERROR_MESSAGES = {
  MAXIMUM_VIDEO_SAVE_COUNT_ERROR:
    '동영상은 100개까지 저장할 수 있습니다. 저장된 동영상을 지워주세요.',
  EXCEED_API_REQUEST_COUNT: (error) =>
    `제한된 API 요청 횟수를 초과하여, 동영상을 불러올 수 없습니다. (Error code : ${error})`,
  API_REQUEST_ERROR: (error) =>
    `동영상 요청에 실패하여, 동영상을 불러올수 없습니다. (Error code : ${error})`,
  VIDEO_DELETE_ERROR: '비디오 삭제에 실패했습니다.',
  EMPTY_SEARCH_TERM: '검색어를 입력해주세요.',
};

export const LOCALSTORAGE_KEYS = {
  VIDEOS: 'videos',
  SEARCH_HISTORY: 'searchHistory',
};

export const INTERSECTION_OBSERVER_OPTIONS = {
  IFRAME_LOAD_THRESHOLD: 0.5,
  REQUEST_VIDEO_THRESHOLD: 1,
};

export const TYPES = {
  FILTER: {
    WATCH_LATER: 'watchLater',
    WATCHED: 'watched',
  },
  PAGE: {
    MANAGEMENT: 'management',
    SEARCH: 'search',
  },
};

export const SELECTORS = {
  MENU_BUTTON: {
    WATCH_LATER_ID: '#watch-later-button',
    WATCHED_ID: '#watched-button',
    SEARCH_ID: '#search-button',
  },

  VIDEO_LIST: {
    VIDEO_LIST_ID: '#video-list-wrapper',
    CLIP_CLASS: '.clip',
    SNACKBAR: '#snackbar',
    NO_VIDEO_MESSAGE_CLASS: '.not-saved-video-image',
  },

  SEARCH_MODAL: {
    MODAL_CLASS: '.modal',
    MODAL_CLOSE_BUTTON_CLASS: '.modal-close',
    MODAL_OVERLAY_CLASS: '.video-search-overlay',

    VIDEO_SEARCH_BAR: {
      SECTION_ID: '#video-search-bar',
      FORM_ID: '#youtube-search-form',
      INPUT_ID: '#youtube-search-input',
      SUBMIT_BUTTON_ID: '#youtube-search-button',
    },

    SEARCH_TERM_HISTORY: {
      SECTION_ID: '#search-term-history',
      CHIPS_CLASS: '.chips',
      CHIP_CLASS: '.chip',
    },

    VIDEO_SEARCH_RESULT: {
      SECTION_ID: '#video-search-result',
      SAVED_VIDEO_COUNT_ID: '#saved-video-count',
      VIDEO_LIST_ID: '#searched-video-list',
      CLIP_CLASS: '.clip',
      SKELETON_CLASS: '.skeleton',
    },
  },

  CLIP: {
    TITLE: '.video-title',
    PREVIEW_CONTAINER: '.preview-container',
    META: '.meta',
    CHANNEL_NAME: '.channel-name',
    VIDEO_SAVE_BUTTON: '.save-btn',
    WATCHED_BUTTON: '.watched-button',
    LIKE_BUTTON: '.like-button',
    DELETE_BUTTON: '.delete-button',
  },
};

export const CLASS_NAMES = {
  CLIP: {
    TITLE: 'video-title',
    PREVIEW_CONTAINER: 'preview-container',
    CHANNEL_NAME: 'channel-name',
    VIDEO_SAVE_BUTTON: 'save-btn',
    MANAGEMENT_BUTTONS: 'management-buttons',
    WATCHED_BUTTON: 'watched-button',
    LIKE_BUTTON: 'like-button',
    DELETE_BUTTON: 'delete-button',
  },
};
