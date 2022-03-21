// 비디오관련 갯수 상숭
export const MAX_SAVABLE_VIDEOS_COUNT = 100;
export const MAX_RENDER_VIDEOS_COUNT = 10;

// 로컬 스토리지 키
export const SAVED_VIDEO_LIST_KEY = 'saved-video-list-key';
export const WATCHED_VIDEO_LIST_KEY = 'watched-video-list-key';

// 서버 URL
export const SERVER_URL = 'https://silly-volhard-192918.netlify.app/.netlify/functions/youtube';

// 버튼 DOM
export const MAIN_TO_WATCH_BUTTONS = `
<button id="check-button" class="button main-videos-button">✅</button>
<button id="delete-button" class="button main-videos-button">🗑️</button>`;
export const MAIN_WATCHED_BUTTONS = `
<button id="delete-button" class="button main-videos-button">🗑️</button>`;
export const MODAL_SAVE_BUTTON = `
<button class="video-item__save-button button">⬇ 저장</button>`;
