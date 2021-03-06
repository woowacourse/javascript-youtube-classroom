import API_KEY from "./key.js";

const CLASSNAME = Object.freeze({
  MODAL: "modal",
  MODAL_INNER: "modal-inner",
  MODAL_CLOSE: "modal-close",
  VIDEO_SEARCH_TAB: "js-video-search-tab",
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
  SAVE_BUTTON_WRAPPER: "js-save-button-wrapper",
  OPEN: "open",
  HIDDEN: "--hidden",
  HEIGHT_85_PERCENT: "h-85",
});

const MESSAGE = Object.freeze({
  KEYWORD_SUBMITTED: "KEYWORD_SUBMITTED",
  DATA_LOADED: "DATA_LOADED",
});

const MAX_KEYWORDS_COUNT = 3;

const MAX_RESULTS_COUNT = 10;

const API_END_POINT = (query, nextPageToken = "") =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS_COUNT}&regionCode=kr&safeSearch=strict&pageToken=${nextPageToken}&q=${query}}&key=${API_KEY}`;

export {
  CLASSNAME,
  MAX_KEYWORDS_COUNT,
  MAX_RESULTS_COUNT,
  MESSAGE,
  API_END_POINT,
};
