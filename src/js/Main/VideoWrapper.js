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

        return value.map(({ _videoId, item, like, videoType }) => {
          const video = new MainVideo(this.#$videoWrapper);
          video.setItem(item);
          video.toggleLike(like);
          video.setVideoType(videoType);
          video.setObserver(this.#observer);
          return [_videoId, video];
        });
      }
    )
  );

  #$noWatchLaterVideoImage = $(`.${CLASSNAME.NO_WATCH_LATER_VIDEO_IMAGE}`);

  #$noHistoryVideoImage = $(`.${CLASSNAME.NO_HISTORY_VIDEO_IMAGE}`);

  constructor() {
    this.#addMessageListeners();
    this.#addEventListeners();
    this.#updateSavedVideoCount();
    this.#showNoVideoImageIfEmpty();
  }

  #observerCallback(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const { videoId } = entry.target.dataset;
      const video = this.#videosMap.get(videoId);
      if (video && video.hasSkeletonEffect()) {
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
    const $video = $icon.closest(`.${CLASSNAME.CLIP}`);
    const { videoId } = $video.dataset;
    const video = this.#videosMap.get(videoId);

    if ($.containsClass($icon, CLASSNAME.MOVE_TO_HISTORY_ICON)) {
      this.#handleMoveToHistoryIconClick(video);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.MOVE_TO_WATCH_LATER_ICON)) {
      this.#handleMoveToWatchLaterIconClick(video);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.LIKE_ICON)) {
      this.#handleLikeIconClick(video);
      return;
    }

    if ($.containsClass($icon, CLASSNAME.DELETE_ICON)) {
      this.#handleDeleteIconClick(video);
    }
  }

  #handleMoveToHistoryIconClick(video) {
    video.setVideoType(VIDEO_TYPE.HISTORY);
    showSnackbar(SNACKBAR_TEXT.MOVED_TO_HISTORY_VIDEO);
    this.#updateLocalStorage();
    this.#showNoVideoImageIfEmpty();
  }

  #handleMoveToWatchLaterIconClick(video) {
    video.setVideoType(VIDEO_TYPE.WATCH_LATER);
    showSnackbar(SNACKBAR_TEXT.MOVED_TO_WATCH_LATER_VIDEO);
    this.#updateLocalStorage();
    this.#showNoVideoImageIfEmpty();
  }

  // eslint-disable-next-line class-methods-use-this
  #handleLikeIconClick(video) {
    const isLiked = video.toggleLike();
    showSnackbar(
      isLiked
        ? SNACKBAR_TEXT.LIKE_VIDEO_ADDED
        : SNACKBAR_TEXT.LIKE_VIDEO_REMOVED
    );
    this.#updateLocalStorage();
  }

  #handleDeleteIconClick(video) {
    // eslint-disable-next-line no-alert
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    this.#removeVideo({ videoId: video.getVideoId() });
    showSnackbar(SNACKBAR_TEXT.VIDEO_DELETED);
  }

  #saveVideo({ videoId, item, callback }) {
    if (this.#videosMap.has(videoId)) {
      // eslint-disable-next-line no-console
      console.error(
        `동일한 영상을 저장할 수 없습니다. videoId: ${videoId} item: ${item}`
      );
      return;
    }

    if (this.#videosMap.size >= NUMBER.MAX_SAVED_VIDEOS_COUNT) {
      showModalSnackbar(SNACKBAR_TEXT.REACHED_MAX_COUNT);
    } else {
      const video = new MainVideo(this.#$videoWrapper);
      video.setItem(item);
      video.setObserver(this.#observer);

      this.#videosMap.set(videoId, video);
      this.#updateLocalStorage();
      this.#updateSavedVideoCount();
      this.#showNoVideoImageIfEmpty();

      callback();
      showModalSnackbar(SNACKBAR_TEXT.VIDEO_SAVED);
    }
  }

  #removeVideo({ videoId }) {
    this.#videosMap.get(videoId).remove();
    this.#videosMap.delete(videoId);
    this.#updateLocalStorage();
    this.#updateSavedVideoCount();
    this.#showNoVideoImageIfEmpty();

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

  #showNoVideoImageIfEmpty() {
    const videoTypesSet = new Set(
      Array.from(this.#videosMap, ([, video]) => video.getVideoType())
    );

    $.toggleClass(
      this.#$noWatchLaterVideoImage,
      CLASSNAME.HIDDEN,
      videoTypesSet.has(VIDEO_TYPE.WATCH_LATER)
    );

    $.toggleClass(
      this.#$noHistoryVideoImage,
      CLASSNAME.HIDDEN,
      videoTypesSet.has(VIDEO_TYPE.HISTORY)
    );
  }

  #hideIfVideoIsSaved({ videoId, hide }) {
    if (this.#videosMap.has(videoId)) {
      hide();
    }
  }
}
