import API_KEY from "./key.js";

const CLASSNAME = Object.freeze({
  WATCH_LATER_TAB: "js-watch-later-tab",
  VIDEO_SEARCH_TAB: "js-video-search-tab",
  MODAL: "modal",
  MODAL_INNER: "modal-inner",
  MODAL_CLOSE: "modal-close",
  YOUTUBE_SEARCH_FORM: "js-youtube-search-form",
  YOUTUBE_SEARCH_FORM_INPUT: "js-youtube-search-form__input",
  YOUTUBE_SEARCH_FORM_BUTTON: "js-youtube-search-form__button",
  MODAL_VIDEO_WRAPPER: "js-modal-video-wrapper",
  NOT_FOUND_IMAGE: "js-not-found-img",
  KEYWORD_HISTORY_SECTION: "js-keyword-history-section",
  VIDEO_ID: "js-video-id",
  VIDEO_TITLE: "js-video-title",
  CHANNEL_TITLE: "js-channel-title",
  PUBLISHED_AT: "js-published-at",
  SAVE_VIDEO_BUTTON_WRAPPER: "js-save-video-button-wrapper",
  SAVE_VIDEO_BUTTON: "js-save-video-button",
  SAVED_VIDEOS_COUNT: "js-saved-videos-count",
  MAX_SAVED_VIDEOS_COUNT: "js-max-saved-videos-count",
  OPEN: "open",
  HIDDEN: "--hidden",
  SKELETON: "skeleton",
});

const MESSAGE = Object.freeze({
  KEYWORD_SUBMITTED: "KEYWORD_SUBMITTED",
  DATA_LOADED: "DATA_LOADED",
  SAVE_VIDEO_BUTTON_CLICKED: "SAVE_VIDEO_BUTTON_CLICKED",
  VIDEO_SAVED: "VIDEO_SAVED",
  HIDE_IF_VIDEO_IS_SAVED: "HIDE_IF_VIDEO_IS_SAVED",
});

const LOCAL_STORAGE_KEY = Object.freeze({
  SAVED_VIDEO_IDS: "savedVideoIds",
  SAVED_VIDEOS_COUNT: "savedVideosCount",
  KEYWORD_HISTORY: "keywordHistory",
  QUERY: "query",
});

const MAX_KEYWORDS_COUNT = 3;

const MAX_RESULTS_COUNT = 10;

const MAX_SAVED_VIDEOS_COUNT = 100;

const SCROLL_EVENT_THRESHOLD = 0.7;

const THROTTLE_TIME_IN_MS = 500;

const API_END_POINT = (query, nextPageToken = "") =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS_COUNT}&regionCode=kr&safeSearch=strict&pageToken=${nextPageToken}&q=${query}}&key=${API_KEY}`;

export {
  CLASSNAME,
  MAX_KEYWORDS_COUNT,
  MAX_RESULTS_COUNT,
  MAX_SAVED_VIDEOS_COUNT,
  MESSAGE,
  API_END_POINT,
  SCROLL_EVENT_THRESHOLD,
  THROTTLE_TIME_IN_MS,
  LOCAL_STORAGE_KEY,
};
