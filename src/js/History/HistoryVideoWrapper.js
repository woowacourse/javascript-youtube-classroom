import { MESSAGE, LOCAL_STORAGE_KEY, CLASSNAME } from "../constants.js";
import messenger from "../Messenger.js";
import { $ } from "../utils/DOM.js";
import { HISTORY_VIDEO_TEMPLATE } from "../Video/template.js";
import { renderWatchLaterVideo } from "../Video/render.js";

export default class HistoryVideoWrapper {
  constructor() {
    this.historyVideoItemsMap = new Map(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HISTORY_VIDEO_ITEMS)) //
    );

    this.historyVideosMap = new Map();

    this.$noSavedVideoImage = $(
      `.${CLASSNAME.HISTORY_CONTAINER} .${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`
    );
    this.$historyVideoWrapper = $(`.${CLASSNAME.HISTORY_VIDEO_WRAPPER}`);

    messenger.addMessageListener(
      MESSAGE.WATCHED_ICON_CLICKED,
      this.saveVideoItem.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      this.hideIfVideoIsSaved.bind(this)
    );

    this.$historyVideoWrapper.addEventListener("click", (event) => {
      const { videoId } = event.target.parentElement.dataset;

      if (event.target.classList.contains(CLASSNAME.WATCH_LATER_ICON)) {
        this.moveVideo(videoId);
      }

      if (event.target.classList.contains(CLASSNAME.DELETE_ICON)) {
        // eslint-disable-next-line no-alert
        if (window.confirm("정말 삭제하시겠습니까?")) {
          this.deleteVideo(videoId);
        }
      }
    });

    this.render();
  }

  moveVideo(videoId) {
    messenger.deliverMessage(MESSAGE.WATCH_LATER_ICON_CLICKED, {
      videoId,
      item: this.historyVideoItemsMap.get(videoId),
    });

    this.historyVideoItemsMap.delete(videoId);

    this.updateLocalStorage();

    this.historyVideosMap.get(videoId).remove();
    this.historyVideosMap.delete(videoId);

    if (this.historyVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  deleteVideo(videoId) {
    this.historyVideoItemsMap.delete(videoId);

    this.updateLocalStorage();

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: -1,
    });

    this.historyVideosMap.get(videoId).remove();
    this.historyVideosMap.delete(videoId);

    if (this.historyVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  saveVideoItem({ videoId, item }) {
    this.historyVideoItemsMap.set(videoId, item);

    this.updateLocalStorage();
    this.renderSingleVideo(item);
  }

  updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.HISTORY_VIDEO_ITEMS,
      JSON.stringify(this.historyVideoItemsMap, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }

  hideIfVideoIsSaved({ videoId, callback }) {
    if (this.historyVideoItemsMap.has(videoId)) {
      callback();
    }
  }

  render() {
    if (this.historyVideoItemsMap.size === 0) {
      $.show(this.$noSavedVideoImage);
      return;
    }

    this.historyVideoItemsMap.forEach(this.renderSingleVideo.bind(this));
  }

  renderSingleVideo(item) {
    $.hide(this.$noSavedVideoImage);

    this.$historyVideoWrapper.insertAdjacentHTML(
      "afterBegin",
      HISTORY_VIDEO_TEMPLATE
    );

    const $video = this.$historyVideoWrapper.children[0];
    renderWatchLaterVideo($video, item);

    const { videoId } = item.id;
    this.historyVideosMap.set(videoId, $video);
  }
}
