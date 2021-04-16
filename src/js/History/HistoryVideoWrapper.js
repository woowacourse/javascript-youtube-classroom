import {
  MESSAGE,
  LOCAL_STORAGE_KEY,
  CLASSNAME,
  SNACKBAR_TEXT,
} from "../constants/index.js";
import messenger from "../Messenger.js";
import { $, removeClass, addClass } from "../utils/DOM.js";
import { HISTORY_VIDEO_TEMPLATE } from "../Video/template.js";
import { renderTheOtherTabVideo } from "../Video/render.js";
import { showSnackbar } from "../utils/snackbar.js";

export default class HistoryVideoWrapper {
  constructor() {
    this.historyVideoItemsMap = new Map(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HISTORY_VIDEO_ITEMS))
    );

    this.historyVideosMap = new Map();

    this.historyLikeVideosArray =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.VIDEO_LIKE)) || [];

    this.$noSavedVideoImage = $(
      `.${CLASSNAME.HISTORY_CONTAINER} .${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`
    );
    this.$historyVideoWrapper = $(`.${CLASSNAME.HISTORY_VIDEO_WRAPPER}`);

    messenger.addMessageListener(
      MESSAGE.WATCHED_ICON_CLICKED,
      this.saveVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED,
      this.deleteVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      this.hideIfVideoIsSaved.bind(this)
    );

    this.$historyVideoWrapper.addEventListener("click", (event) => {
      const { videoId } = event.target.parentElement.dataset;

      if (event.target.classList.contains(CLASSNAME.WATCH_LATER_ICON)) {
        this.moveVideo({ videoId });
        showSnackbar(SNACKBAR_TEXT.MOVED_TO_WATCH_LATER_VIDEO);
      }

      if (event.target.classList.contains(CLASSNAME.LIKE_ICON)) {
        this.handleLikeIconClick({ videoId, event });
      }

      if (event.target.classList.contains(CLASSNAME.DELETE_ICON)) {
        // eslint-disable-next-line no-alert
        if (window.confirm("정말 삭제하시겠습니까?")) {
          this.deleteVideo({ videoId });
          messenger.deliverMessage(MESSAGE.SAVED_VIDEO_DELETED, { videoId });
          showSnackbar(SNACKBAR_TEXT.VIDEO_DELETED);
        }
      }
    });

    this.render();
  }

  // TODO: 좋아요 표시되는 거랑 좋아요 취소되는 것 분리하기
  handleLikeIconClick({ videoId, event }) {
    if (this.historyLikeVideosArray.includes(videoId)) {
      const idx = this.historyLikeVideosArray.indexOf(videoId);
      this.historyLikeVideosArray.splice(idx, 1);

      this.updateLikeVideosLocalStorage();

      removeClass(event.target, "like");

      messenger.deliverMessage(MESSAGE.LIKE_ICON_DEACTIVATED, {
        videoId,
        item: this.historyVideoItemsMap.get(videoId),
      });
      showSnackbar(SNACKBAR_TEXT.DELETED_FROM_LIKE_VIDEO);
    } else {
      this.historyLikeVideosArray.push(videoId);

      this.updateLikeVideosLocalStorage();

      addClass(event.target, "like");

      messenger.deliverMessage(MESSAGE.LIKE_ICON_ACTIVATED, {
        videoId,
        item: this.historyVideoItemsMap.get(videoId),
      });
      showSnackbar(SNACKBAR_TEXT.ADDED_TO_LIKE_VIDEO);
    }
  }

  moveVideo({ videoId }) {
    messenger.deliverMessage(MESSAGE.WATCH_LATER_ICON_CLICKED, {
      videoId,
      item: this.historyVideoItemsMap.get(videoId),
    });

    this.historyVideoItemsMap.delete(videoId);

    this.updateVideoItemsLocalStorage();

    this.historyVideosMap.get(videoId).remove();
    this.historyVideosMap.delete(videoId);

    if (this.historyVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  deleteVideo({ videoId }) {
    if (!this.historyVideoItemsMap.has(videoId)) {
      return;
    }

    this.historyVideoItemsMap.delete(videoId);

    this.updateVideoItemsLocalStorage();

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: -1,
    });

    this.historyVideosMap.get(videoId).remove();
    this.historyVideosMap.delete(videoId);

    if (this.historyVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  saveVideo({ videoId, item }) {
    this.historyVideoItemsMap.set(videoId, item);

    this.updateVideoItemsLocalStorage();
    this.renderSingleVideo(item);
  }

  updateVideoItemsLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.HISTORY_VIDEO_ITEMS,
      JSON.stringify(this.historyVideoItemsMap, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }

  updateLikeVideosLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.VIDEO_LIKE,
      JSON.stringify(this.historyLikeVideosArray)
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
    renderTheOtherTabVideo($video, item);

    const { videoId } = item.id;
    this.historyVideosMap.set(videoId, $video);

    this.historyLikeVideosArray =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.VIDEO_LIKE)) || [];

    if (this.historyLikeVideosArray.includes(videoId)) {
      addClass($video.querySelector(`.${CLASSNAME.LIKE_ICON}`), "like");
    }
  }
}
