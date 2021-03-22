export const MAX_RECENT_KEYWORD_COUNT = 3;
export const MAX_VIDEO_STORAGE_CAPACITY = 100;

export const YOUTUBE_API = Object.freeze({
  SEARCH_ENDPOINT: 'https://suspicious-tesla-29e2bd.netlify.app/.netlify/functions/fetchYoutubeAPI/search',
  PART_TYPE: 'snippet',
  MAX_RESULT_COUNT: 10,
  SEARCH_TYPE_VIDEO: 'video',
  REGION_CODE: 'KR',
  EMBEDDABLE: true,
});

export const YOUTUBE_LINK_ENDPOINT = Object.freeze({
  VIDEO: 'https://www.youtube.com/embed/',
  CHANNEL: 'https://www.youtube.com/channel/',
});

export const DB_KEY = Object.freeze({
  VIDEOS: 'videos',
  RECENT_KEYWORDS: 'recentKeywords',
});

export const CLASS_NAME = Object.freeze({
  WATCHING_SECTION: 'watching-section',
  WATCHED_SECTION: 'watched-section',
  WATCHING: 'watching',
  WATCHED: 'watched',
  NO_WATCHING: 'no-watching',
  NO_WATCHED: 'no-watched',
  CHECKED: 'checked',
});

export const SCROLL_DELAY_TIME = 300;
export const NOTIFICATION_SHOW_TIME = 1500;

export const MESSAGE = Object.freeze({
  NO_KEYWORD_IS_SUBMITTED: `검색키워드가 입력되지 않았습니다.\n저장하고 싶은 검색키워드를 입력해주세요! 😁`,
  STORAGE_CAPACITY_IS_FULL: `최대 영상 저장갯수\n${MAX_VIDEO_STORAGE_CAPACITY}개가 다 찼습니다. 😭`,
  VIDEO_IS_ALREADY_SAVED: `이미 저장된 영상입니다!\n나의 강의실에서 확인해보세요. 😍`,
  VIDEO_IS_SAVED_SUCCESSFULLY: `선택하신 영상이\n[시청 중인 영상] 메뉴에 추가되었습니다. 🤩`,
  SEARCH_REQUEST_HAS_FAILED: `검색포인트를 모두 소진하였습니다.\n오후 5시에 다시 시도해 주세요. 🥺`,
  VIDEO_IS_MOVED_TO_WATCHED_MENU: '[시청 완료 영상]으로 이동되었습니다. 👉👉',
  VIDEO_IS_MOVED_TO_WATCHING_MENU: '[시청 중인 영상]으로 이동되었습니다. 👈👈',
  VIDEO_IS_REMOVED_SUCCESSFULLY: '영상 삭제가 완료되었습니다. 😉',
  REQUEST_HAS_FAILED: '요청하신 작업을 수행할 수 없습니다. 문제가 지속적으로 발생되면 관리자에게 문의해주세요. 🙏',
  ARE_YOU_SURE_TO_REMOVE_VIDEO: '정말로 삭제하시겠습니까? 🤔',
});
