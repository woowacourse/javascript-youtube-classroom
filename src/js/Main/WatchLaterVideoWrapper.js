import {
  LOCAL_STORAGE_KEY,
  CLASSNAME,
  SNACKBAR_TEXT,
  VIDEO_TYPE,
} from "../constants/index.js";
import { $, showSnackbar } from "../utils/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
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

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        this.attachData(entry.target);
      });
    });
  }

  attachData($video) {
    const { videoId } = $video.dataset;
    const item = this.watchLaterVideoItemsMap.get(videoId);
    if ($video.classList.contains(CLASSNAME.SKELETON)) {
      renderMainVideo($video, item);
    }
  }

  selectHTMLElements() {
    this.$noSavedVideoImage = $(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`);
    this.$watchLaterVideoWrapper = $(`.${CLASSNAME.WATCH_LATER_VIDEO_WRAPPER}`);
  }

  addMessageListeners() {
    messenger.addMessageListener(MESSAGE.SAVE_VIDEO, this.saveVideo.bind(this));

    messenger.addMessageListener(
      MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED,
      this.deleteVideo.bind(this)
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
    if (!$.containsClass(event.target, CLASSNAME.ICON)) {
      return;
    }

    const $icon = event.target;
    const $iconsWrapper = $icon.closest(`.${CLASSNAME.ICONS_WRAPPER}`);
    const { videoId } = $iconsWrapper.dataset;

    if ($.containsClass($icon, CLASSNAME.MOVE_TO_HISTORY_ICON)) {
      this.handleMoveToHistoryIconClick(videoId);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.MOVE_TO_WATCH_LATER_ICON)) {
      this.handleMoveToWatchLaterIconClick(videoId);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.LIKE_ICON)) {
      this.handleLikeIconClick(videoId);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.DELETE_ICON)) {
      this.handleDeleteIconClick(videoId);
    }
  }

  handleMoveToHistoryIconClick(videoId) {
    const item = this.watchLaterVideoItemsMap.get(videoId);
    this.changeVideoType({ videoId, item, nextVideoType: VIDEO_TYPE.HISTORY });

    showSnackbar(SNACKBAR_TEXT.MOVED_TO_HISTORY_VIDEO);
  }

  handleMoveToWatchLaterIconClick(videoId) {
    const item = this.watchLaterVideoItemsMap.get(videoId);
    this.changeVideoType({
      videoId,
      item,
      nextVideoType: VIDEO_TYPE.WATCH_LATER,
    });

    showSnackbar(SNACKBAR_TEXT.MOVED_TO_WATCH_LATER_VIDEO);
  }

  handleLikeIconClick(videoId) {
    const $video = this.watchLaterVideosMap.get(videoId);

    $.toggleClass($video, "like");
    showSnackbar(
      $.containsClass($video, "like")
        ? SNACKBAR_TEXT.LIKE_VIDEO_ADDED
        : SNACKBAR_TEXT.LIKE_VIDEO_REMOVED
    );
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

  changeVideoType({ videoId, item, nextVideoType }) {
    this.watchLaterVideoItemsMap.set(videoId, {
      ...item,
      videoType: nextVideoType,
    });
    this.updateLocalStorage();

    const $video = this.watchLaterVideosMap.get(videoId);

    Object.values(VIDEO_TYPE).forEach((type) => $.removeClass($video, type));
    $.addClass($video, nextVideoType);
  }

  saveVideo({ videoId, item }) {
    const newItem = {
      ...item,
      videoType: VIDEO_TYPE.WATCH_LATER,
    };
    this.watchLaterVideoItemsMap.set(videoId, newItem);
    this.updateLocalStorage();

    this.mountTemplate({
      videoId,
      item: newItem,
    });
  }

  moveVideo({ videoId }) {
    messenger.deliverMessage(MESSAGE.MOVE_TO_HISTORY_ICON_CLICKED, {
      videoId,
      item: this.watchLaterVideoItemsMap.get(videoId),
    });

    this.removeVideo({ videoId });
  }

  deleteVideo({ videoId }) {
    if (!this.watchLaterVideoItemsMap.has(videoId)) {
      return;
    }

    this.removeVideo({ videoId });
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

  hideIfVideoIsSaved({ videoId, hide }) {
    if (this.watchLaterVideoItemsMap.has(videoId)) {
      hide();
    }
  }

  render() {
    if (this.watchLaterVideoItemsMap.size === 0) {
      $.show(this.$noSavedVideoImage);
      return;
    }

    this.watchLaterVideoItemsMap.forEach((item, videoId) =>
      this.mountTemplate({ videoId, item })
    );
  }

  mountTemplate({ videoId, item }) {
    $.hide(this.$noSavedVideoImage);

    this.$watchLaterVideoWrapper.insertAdjacentHTML(
      "afterBegin",
      WATCH_LATER_VIDEO_TEMPLATE
    );

    const [$video] = this.$watchLaterVideoWrapper.children;
    const { videoType } = item;
    $video.dataset.videoId = videoId;

    $.addClass($video, videoType);

    this.watchLaterVideosMap.set(videoId, $video);
    this.observer.observe($video);
  }
}
