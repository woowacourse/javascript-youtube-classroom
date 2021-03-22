import {
  LOCAL_STORAGE_KEY,
  CLASSNAME,
  SNACKBAR_TEXT,
} from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $, showSnackbar } from "../utils/index.js";
import { HISTORY_VIDEO_TEMPLATE, renderMainVideo } from "../Video/index.js";

export default class HistoryVideoWrapper {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addMessageListeners();
    this.addEventListeners();
    this.render();
  }

  initializeVariables() {
    this.historyVideoItemsMap = new Map(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HISTORY_VIDEO_ITEMS))
    );

    this.historyVideosMap = new Map();
  }

  selectHTMLElements() {
    this.$noSavedVideoImage = $(`.${CLASSNAME.NO_WATCHED_VIDEO_IMAGE}`);
    this.$historyVideoWrapper = $(`.${CLASSNAME.HISTORY_VIDEO_WRAPPER}`);
  }

  addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED,
      this.deleteVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.WATCHED_ICON_CLICKED,
      this.saveVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      this.hideIfVideoIsSaved.bind(this)
    );
  }

  addEventListeners() {
    this.$historyVideoWrapper.addEventListener(
      "click",
      this.handleVideoWrapperClick.bind(this)
    );
  }

  handleVideoWrapperClick(event) {
    const { target: $videoWrapper } = event;
    const { videoId } = event.target.parentElement.dataset;

    if ($videoWrapper.classList.contains(CLASSNAME.WATCH_LATER_ICON)) {
      this.handleWatchingIconClick(videoId);
      return;
    }

    if ($videoWrapper.classList.contains(CLASSNAME.DELETE_ICON)) {
      this.handleDeleteIconClick(videoId);
    }
  }

  handleWatchingIconClick(videoId) {
    this.moveVideo({ videoId });
    showSnackbar(SNACKBAR_TEXT.MOVED_TO_WATCH_LATER_VIDEO);
  }

  handleDeleteIconClick(videoId) {
    // eslint-disable-next-line no-alert
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    this.deleteVideo({ videoId });
    messenger.deliverMessage(MESSAGE.SAVED_VIDEO_DELETED, { videoId });
    showSnackbar(SNACKBAR_TEXT.VIDEO_DELETED);
  }

  saveVideo({ videoId, item }) {
    this.historyVideoItemsMap.set(videoId, item);
    this.updateLocalStorage();
    this.renderSingleVideo({ videoId, item });
  }

  moveVideo({ videoId }) {
    messenger.deliverMessage(MESSAGE.WATCH_LATER_ICON_CLICKED, {
      videoId,
      item: this.historyVideoItemsMap.get(videoId),
    });

    this.removeVideo({ videoId });
  }

  deleteVideo({ videoId }) {
    if (!this.historyVideoItemsMap.has(videoId)) {
      return;
    }

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: -1,
    });

    this.removeVideo({ videoId });
  }

  removeVideo({ videoId }) {
    this.historyVideoItemsMap.delete(videoId);
    this.historyVideosMap.get(videoId).remove();
    this.historyVideosMap.delete(videoId);
    this.updateLocalStorage();
    this.render();
  }

  updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.HISTORY_VIDEO_ITEMS,
      JSON.stringify(this.historyVideoItemsMap, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }

  hideIfVideoIsSaved({ videoId, hide }) {
    if (this.historyVideoItemsMap.has(videoId)) {
      hide();
    }
  }

  render() {
    if (this.historyVideoItemsMap.size === 0) {
      $.show(this.$noSavedVideoImage);
      return;
    }

    this.historyVideoItemsMap.forEach(this.renderSingleVideo.bind(this));
  }

  renderSingleVideo({ videoId, item }) {
    $.hide(this.$noSavedVideoImage);

    this.$historyVideoWrapper.insertAdjacentHTML(
      "afterBegin",
      HISTORY_VIDEO_TEMPLATE
    );

    const $video = this.$historyVideoWrapper.children[0];

    renderMainVideo($video, item);

    this.historyVideosMap.set(videoId, $video);
  }
}
