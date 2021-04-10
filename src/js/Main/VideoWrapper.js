import {
  LOCAL_STORAGE_KEY,
  CLASSNAME,
  SNACKBAR_TEXT,
  VIDEO_TYPE,
  NUMBER,
} from "../constants/index.js";
import { $, showModalSnackbar, showSnackbar } from "../utils/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { MainVideo } from "../Video/index.js";

export default class VideoWrapper {
  #$videoWrapper = $(`.${CLASSNAME.MAIN_VIDEO_WRAPPER}`);

  #observer = new IntersectionObserver(this.#observerCallback.bind(this));

  #videosMap = new Map(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.WATCH_LATER_VIDEO_ITEMS),
      (key, value) => {
        if (key !== "") return value;
        if (value === null) return null;

        return value.map(({ _videoId, item }) => {
          const video = new MainVideo(this.#$videoWrapper);
          video.setItem(item);
          video.setObserver(this.#observer);
          return [_videoId, video];
        });
      }
    )
  );

  #$noSavedVideoImage = $(`.${CLASSNAME.NO_WATCHING_VIDEO_IMAGE}`);

  constructor() {
    this.#addMessageListeners();
    this.#addEventListeners();
    this.#updateSavedVideoCount();
  }

  #observerCallback(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const { videoId } = entry.target.dataset;
      const video = this.#videosMap.get(videoId);
      if (video.hasSkeletonEffect()) {
        video.attachData();
      }
    });
  }

  #addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.SAVE_VIDEO_BUTTON_CLICKED,
      this.#saveVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED,
      this.#removeVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      this.#hideIfVideoIsSaved.bind(this)
    );
  }

  #addEventListeners() {
    this.#$videoWrapper.addEventListener(
      "click",
      this.#handleVideoWrapperClick.bind(this)
    );
  }

  #handleVideoWrapperClick(event) {
    if (!$.containsClass(event.target, CLASSNAME.ICON)) {
      return;
    }

    const $icon = event.target;
    const $iconsWrapper = $icon.closest(`.${CLASSNAME.ICONS_WRAPPER}`);
    const { videoId } = $iconsWrapper.dataset;

    if ($.containsClass($icon, CLASSNAME.MOVE_TO_HISTORY_ICON)) {
      this.#handleMoveToHistoryIconClick(videoId);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.MOVE_TO_WATCH_LATER_ICON)) {
      this.#handleMoveToWatchLaterIconClick(videoId);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.LIKE_ICON)) {
      this.#handleLikeIconClick(videoId);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.DELETE_ICON)) {
      this.#handleDeleteIconClick(videoId);
    }
  }

  #handleMoveToHistoryIconClick(videoId) {
    this.#changeVideoType({ videoId, nextVideoType: VIDEO_TYPE.HISTORY });

    showSnackbar(SNACKBAR_TEXT.MOVED_TO_HISTORY_VIDEO);
  }

  #handleMoveToWatchLaterIconClick(videoId) {
    this.#changeVideoType({
      videoId,
      nextVideoType: VIDEO_TYPE.WATCH_LATER,
    });

    showSnackbar(SNACKBAR_TEXT.MOVED_TO_WATCH_LATER_VIDEO);
  }

  #handleLikeIconClick(videoId) {
    const $video = this.#videosMap.get(videoId).getVideoElement();

    $.toggleClass($video, "like");
    showSnackbar(
      $.containsClass($video, "like")
        ? SNACKBAR_TEXT.LIKE_VIDEO_ADDED
        : SNACKBAR_TEXT.LIKE_VIDEO_REMOVED
    );
  }

  #handleDeleteIconClick(videoId) {
    // eslint-disable-next-line no-alert
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    this.#removeVideo({ videoId });
    showSnackbar(SNACKBAR_TEXT.VIDEO_DELETED);
  }

  // FIXME
  #changeVideoType({ videoId, nextVideoType }) {
    // const item = this.#videosMap.get(videoId);
    // const newItem = {
    //   ...item,
    //   videoType: nextVideoType,
    // };
    this.#updateLocalStorage();
    this.#setNextVideoType(videoId, nextVideoType);
  }

  // FIXME
  #setNextVideoType(videoId, nextVideoType) {
    const $video = this.#videosMap.get(videoId).getVideoElement();

    Object.values(VIDEO_TYPE).forEach((type) => $.removeClass($video, type));
    $.addClass($video, nextVideoType);
  }

  #saveVideo({ videoId, item, callback }) {
    if (this.#videosMap.has(videoId)) {
      throw new Error(`동일한 영상을 저장할 수 없습니다. videoId: ${videoId}`);
    }

    if (this.#videosMap.size >= NUMBER.MAX_SAVED_VIDEOS_COUNT) {
      showModalSnackbar(SNACKBAR_TEXT.REACHED_MAX_COUNT);
    } else {
      const newItem = {
        ...item,
        videoType: VIDEO_TYPE.WATCH_LATER,
      };
      const video = new MainVideo(this.#$videoWrapper);
      this.#videosMap.set(videoId, video);

      video.setItem(newItem);
      video.setObserver(this.#observer);
      this.#updateLocalStorage();
      this.#updateSavedVideoCount();

      callback();
      showModalSnackbar(SNACKBAR_TEXT.VIDEO_SAVED);
    }
  }

  #removeVideo({ videoId }) {
    this.#videosMap.get(videoId).remove();
    this.#videosMap.delete(videoId);
    this.#updateLocalStorage();
    this.#updateSavedVideoCount();

    messenger.deliverMessage(MESSAGE.SAVED_VIDEO_DELETED, { videoId });
  }

  #updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.WATCH_LATER_VIDEO_ITEMS,
      JSON.stringify(this.#videosMap, (key, value) =>
        value instanceof Map
          ? Array.from(value).map(([, video]) => video.toJSON())
          : value
      )
    );
  }

  #updateSavedVideoCount() {
    messenger.deliverMessage(MESSAGE.SAVED_VIDEO_COUNT_CHANGED, {
      count: this.#videosMap.size,
    });
  }

  #hideIfVideoIsSaved({ videoId, hide }) {
    if (this.#videosMap.has(videoId)) {
      hide();
    }
  }
}
