import {
  LOCAL_STORAGE_KEY,
  CLASSNAME,
  SNACKBAR_TEXT,
} from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $, showSnackbar } from "../utils/index.js";
import { WATCH_LATER_VIDEO_TEMPLATE, renderMainVideo } from "../Video/index.js";

export default class WatchLaterVideoWrapper {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addMessageListeners();
    this.addEventListeners();
    this.render();
  }

  initializeVariables() {
    this.watchLaterVideoItemsMap = new Map(
      JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY.WATCH_LATER_VIDEO_ITEMS)
      )
    );

    this.watchLaterVideosMap = new Map();
  }

  selectHTMLElements() {
    this.$noSavedVideoImage = $(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`);
    this.$watchLaterVideoWrapper = $(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`);
  }

  addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.SAVE_VIDEO_BUTTON_CLICKED,
      this.saveVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED,
      this.deleteVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.WATCH_LATER_ICON_CLICKED,
      this.saveVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      this.hideIfVideoIsSaved.bind(this)
    );
  }

  addEventListeners() {
    this.$watchLaterVideoWrapper.addEventListener(
      "click",
      this.handleVideoWrapperClick.bind(this)
    );
  }

  handleVideoWrapperClick(event) {
    const { target: $videoWrapper } = event;
    const { videoId } = $videoWrapper.parentElement.dataset;

    if ($videoWrapper.classList.contains(CLASSNAME.WATCHED_ICON)) {
      this.handleWatchedIconClick(videoId);
      return;
    }

    if ($videoWrapper.classList.contains(CLASSNAME.DELETE_ICON)) {
      this.handleDeleteIconClick(videoId);
    }
  }

  handleWatchedIconClick(videoId) {
    this.moveVideo({ videoId });
    showSnackbar(SNACKBAR_TEXT.MOVED_TO_HISTORY_VIDEO);
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
    this.watchLaterVideoItemsMap.set(videoId, item);
    this.updateLocalStorage();
    this.renderSingleVideo({ videoId, item });
  }

  moveVideo({ videoId }) {
    messenger.deliverMessage(MESSAGE.WATCHED_ICON_CLICKED, {
      videoId,
      item: this.watchLaterVideoItemsMap.get(videoId),
    });

    this.removeVideo({ videoId });
  }

  deleteVideo({ videoId }) {
    if (!this.watchLaterVideoItemsMap.has(videoId)) {
      return;
    }

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: -1,
    });

    this.removeVideo();
  }

  removeVideo({ videoId }) {
    this.watchLaterVideoItemsMap.delete(videoId);
    this.watchLaterVideosMap.get(videoId).remove();
    this.watchLaterVideosMap.delete(videoId);
    this.updateLocalStorage();
    this.render();
  }

  updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.WATCH_LATER_VIDEO_ITEMS,
      JSON.stringify(this.watchLaterVideoItemsMap, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }

  hideIfVideoIsSaved({ videoId, callback }) {
    if (this.watchLaterVideoItemsMap.has(videoId)) {
      callback();
    }
  }

  render() {
    if (this.watchLaterVideoItemsMap.size === 0) {
      $.show(this.$noSavedVideoImage);
      return;
    }

    this.watchLaterVideoItemsMap.forEach(this.renderSingleVideo.bind(this));
  }

  renderSingleVideo({ videoId, item }) {
    $.hide(this.$noSavedVideoImage);

    this.$watchLaterVideoWrapper.insertAdjacentHTML(
      "afterBegin",
      WATCH_LATER_VIDEO_TEMPLATE
    );

    const $video = this.$watchLaterVideoWrapper.children[0];

    renderMainVideo($video, item);

    this.watchLaterVideosMap.set(videoId, $video);
  }
}
