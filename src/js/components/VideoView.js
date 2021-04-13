import { $, showSnackbar } from "../utils/dom.js";
import {
  MENU,
  SECTION,
  CONFIRM_MESSAGE,
  SNACKBAR_MESSAGE,
  CLASS_NAME,
} from "../utils/constants.js";
import { createVideoTemplate } from "../utils/templates.js";
import SavedVideoManager from "../model/SavedVideoManager.js";

class VideoView {
  constructor() {
    this.savedVideoManager = new SavedVideoManager();
    this._selectDOM();
    this._initState();
    this._bindEvent();
    this._initSubscription();
  }

  setState({ savedVideos, clickedMenu }) {
    this.savedVideos = savedVideos ?? this.savedVideos;
    this.clickedMenu = clickedMenu ?? this.clickedMenu;

    this._render();
  }

  _initState() {
    this.savedVideos = this.savedVideoManager.savedVideos;
    this.likedVideos = this.savedVideoManager.likedVideos;
    this.clickedMenu = MENU.WATCH_LATER;

    this._render();
  }

  _initSubscription() {
    this.savedVideoManager.subscribe(this.setState.bind(this));
  }

  _selectDOM() {
    this.$target = $(`.${CLASS_NAME.VIDEO_VIEW}`);
    this.$videoViewVideoWrapper = $(`.${CLASS_NAME.VIDEO_VIEW_VIDEO_WRAPPER}`);
    this.$snackbar = $(`.${CLASS_NAME.SNACKBAR}`);
  }

  _bindEvent() {
    this.$videoViewVideoWrapper.addEventListener("click", e => {
      if (e.target.classList.contains(`${CLASS_NAME.WATCHED_CHECK}`)) {
        this._handleCheckWatched(e);
      }

      if (e.target.classList.contains(`${CLASS_NAME.LIKED_CHECK}`)) {
        this._handleCheckLiked(e);
      }

      if (e.target.classList.contains(`${CLASS_NAME.TRASH_CAN}`)) {
        this._handleRemoveSaved(e);
      }
    });
  }

  _handleCheckWatched(e) {
    const watchedVideoId = e.target.closest(`.${CLASS_NAME.CLIP_ACTIONS}`).dataset.videoId;
    const savedVideos = this.savedVideos.map(video => {
      if (video.videoId === watchedVideoId) {
        video.isWatched = !video.isWatched;
      }

      return video;
    });

    this.savedVideoManager._setState({ savedVideos });

    const message = SNACKBAR_MESSAGE.MOVE(this.clickedMenu === MENU.WATCH_LATER ? "본" : "볼");
    showSnackbar(this.$snackbar, message);
  }

  _handleCheckLiked(e) {
    const likedVideoId = e.target.closest(`.${CLASS_NAME.CLIP_ACTIONS}`).dataset.videoId;
    const likedVideos = this.savedVideos.map(video => {
      if (video.videoId === likedVideoId) {
        video.isLiked = !video.isLiked;
      }

      return video;
    });
    this.savedVideoManager._setState({ likedVideos });

    const isLiked = e.target
      .closest(`.${CLASS_NAME.LIKED_CHECK}`)
      .classList.contains("opacity-hover");

    showSnackbar(this.$snackbar, isLiked ? SNACKBAR_MESSAGE.LIKE : SNACKBAR_MESSAGE.UNLIKE);
  }

  _handleRemoveSaved(e) {
    if (confirm(CONFIRM_MESSAGE.DELETE)) {
      const removeVideoId = e.target.closest(`.${CLASS_NAME.CLIP_ACTIONS}`).dataset.videoId;
      const savedVideos = this.savedVideos.filter(video => video.videoId !== removeVideoId);

      this.savedVideoManager._setState({ savedVideos });
      showSnackbar(this.$snackbar, SNACKBAR_MESSAGE.DELETE);
    }
  }

  _render() {
    if (this.clickedMenu === MENU.WATCH_LATER) {
      this.$videoViewVideoWrapper.innerHTML = this.savedVideos.length
        ? this.savedVideos
            .filter(video => !video.isWatched)
            .map(video => createVideoTemplate(video, SECTION.MAIN))
            .join("")
        : createNoWatchLaterTemplate();
    }

    if (this.clickedMenu === MENU.WATCHED) {
      this.$videoViewVideoWrapper.innerHTML = this.savedVideos.length
        ? this.savedVideos
            .filter(video => video.isWatched)
            .map(video => createVideoTemplate(video, SECTION.MAIN))
            .join("")
        : createNoWatchLaterTemplate();
    }

    if (this.clickedMenu === MENU.LIKED) {
      this.$videoViewVideoWrapper.innerHTML = this.savedVideos.length
        ? this.savedVideos
            .filter(video => video.isLiked)
            .map(video => createVideoTemplate(video, SECTION.MAIN, "liked"))
            .join("")
        : createNoLikedVideoTemplate();
    }
  }
}

const createNoWatchLaterTemplate = () =>
  `<div class='d-flex flex-col justify-center items-center no-search-result'>
    <img class='d-block no-saved-video-image' src='src/images/status/no_watch_later_video.png' alt='결과 없음'>
  </div>`;

const createNoLikedVideoTemplate = () =>
  `<div class='d-flex flex-col justify-center items-center no-search-result'>
    <img class='d-block no-liked-video-image' src='src/images/status/no_watch_later_video.png' alt='결과 없음'>
  </div>`;

export default VideoView;
