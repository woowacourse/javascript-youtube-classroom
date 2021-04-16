import {
  MESSAGE,
  SNACKBAR_TEXT,
  LOCAL_STORAGE_KEY,
  CLASSNAME,
} from "../constants/index.js";
import messenger from "../Messenger.js";
import { $, removeClass, addClass } from "../utils/DOM.js";
import { WATCH_LATER_VIDEO_TEMPLATE } from "../Video/template.js";
import { renderTheOtherTabVideo } from "../Video/render.js";
import { showSnackbar } from "../utils/snackbar.js";

export default class WatchLaterVideoWrapper {
  constructor() {
    this.watchLaterVideoItemsMap = new Map(
      JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY.WATCH_LATER_VIDEO_ITEMS)
      )
    );

    this.watchLaterVideosMap = new Map();

    this.watchLaterLikeVideosArray =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.VIDEO_LIKE)) || [];

    this.$noSavedVideoImage = $(
      `.${CLASSNAME.WATCH_LATER_CONTAINER} .${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`
    );
    this.$watchLaterVideoWrapper = $(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`);

    messenger.addMessageListener(
      MESSAGE.SAVE_VIDEO_BUTTON_CLICKED,
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

    messenger.addMessageListener(
      MESSAGE.WATCH_LATER_ICON_CLICKED,
      this.saveVideo.bind(this)
    );

    this.$watchLaterVideoWrapper.addEventListener("click", (event) => {
      const { videoId } = event.target.parentElement.dataset;

      if (event.target.classList.contains(CLASSNAME.WATCHED_ICON)) {
        this.moveVideo({ videoId });
        showSnackbar(SNACKBAR_TEXT.MOVED_TO_HISTORY_VIDEO);
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
    if (this.watchLaterLikeVideosArray.includes(videoId)) {
      const idx = this.watchLaterLikeVideosArray.indexOf(videoId);
      this.watchLaterLikeVideosArray.splice(idx, 1);

      this.updateLikeVideosLocalStorage();

      removeClass(event.target, "like");

      messenger.deliverMessage(MESSAGE.LIKE_ICON_DEACTIVATED, {
        videoId,
        item: this.watchLaterVideoItemsMap.get(videoId),
      });
      showSnackbar(SNACKBAR_TEXT.DELETED_FROM_LIKE_VIDEO);
    } else {
      this.watchLaterLikeVideosArray.push(videoId);

      this.updateLikeVideosLocalStorage();

      addClass(event.target, "like");

      messenger.deliverMessage(MESSAGE.LIKE_ICON_ACTIVATED, {
        videoId,
        item: this.watchLaterVideoItemsMap.get(videoId),
      });
      showSnackbar(SNACKBAR_TEXT.ADDED_TO_LIKE_VIDEO);
    }
  }

  moveVideo({ videoId }) {
    messenger.deliverMessage(MESSAGE.WATCHED_ICON_CLICKED, {
      videoId,
      item: this.watchLaterVideoItemsMap.get(videoId),
    });

    this.watchLaterVideoItemsMap.delete(videoId);

    this.updateVideoItemsLocalStorage();

    this.watchLaterVideosMap.get(videoId).remove();
    this.watchLaterVideosMap.delete(videoId);

    if (this.watchLaterVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  deleteVideo({ videoId }) {
    if (!this.watchLaterVideoItemsMap.has(videoId)) {
      return;
    }

    this.watchLaterVideoItemsMap.delete(videoId);

    this.updateVideoItemsLocalStorage();

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: -1,
    });

    this.watchLaterVideosMap.get(videoId).remove();
    this.watchLaterVideosMap.delete(videoId);

    if (this.watchLaterVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  saveVideo({ videoId, item }) {
    this.watchLaterVideoItemsMap.set(videoId, item);

    this.updateVideoItemsLocalStorage();

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: +1,
    });

    this.renderSingleVideo(item);
  }

  updateVideoItemsLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.WATCH_LATER_VIDEO_ITEMS,
      JSON.stringify(this.watchLaterVideoItemsMap, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }

  updateLikeVideosLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.VIDEO_LIKE,
      JSON.stringify(this.watchLaterLikeVideosArray)
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

  renderSingleVideo(item) {
    $.hide(this.$noSavedVideoImage);

    this.$watchLaterVideoWrapper.insertAdjacentHTML(
      "afterBegin",
      WATCH_LATER_VIDEO_TEMPLATE
    );

    const $video = this.$watchLaterVideoWrapper.children[0];
    renderTheOtherTabVideo($video, item);

    const { videoId } = item.id;
    this.watchLaterVideosMap.set(videoId, $video);

    if (this.watchLaterLikeVideosArray.includes(videoId)) {
      addClass($video.querySelector(`.${CLASSNAME.LIKE_ICON}`), "like");
    }
  }
}
