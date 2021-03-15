import WatchController from "./WatchController.js";

import elements from "../../utils/elements.js";
import { showSnackbar } from "../../utils/snackbar.js";
import {
  ERROR_MESSAGE,
  DOM_CONSTANTS,
  VIDEO_VIEW_NAME,
} from "../../utils/constants.js";

import videos from "../../state/videos.js";
import videoViewIndex from "../../state/videoViewIndex.js";

export default class WatchEventController {
  constructor() {
    this.watchController = new WatchController();
  }

  bindEvents() {
    window.addEventListener("load", this.onLoadApp.bind(this));

    this.bindNavEvents();
    this.bindSaveVideoEvents();
    this.bindClipButtonEvents();
  }

  bindNavEvents() {
    elements.$watchLaterViewButton.addEventListener(
      "click",
      this.onClickWatchLaterViewButton.bind(this)
    );

    elements.$watchedViewButton.addEventListener(
      "click",
      this.onClickWatchedViewButton.bind(this)
    );

    elements.$likedViewButton.addEventListener(
      "click",
      this.onClickLikedViewButton.bind(this)
    );
  }

  bindSaveVideoEvents() {
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveButton.bind(this)
    );
  }

  bindClipButtonEvents() {
    elements.$watchLaterVideos.addEventListener(
      "click",
      this.onClipButtonEvents.bind(this)
    );

    elements.$watchedVideos.addEventListener(
      "click",
      this.onClipButtonEvents.bind(this)
    );

    elements.$likedVideos.addEventListener(
      "click",
      this.onClipButtonEvents.bind(this)
    );
  }

  onClipButtonEvents(e) {
    const buttonType = e.target.dataset.buttonType;
    const videoId = e.target.dataset.videoId;

    if (!buttonType) {
      return;
    }

    switch (buttonType) {
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.WATCHED:
        this.watchController.toggleWatched(videoId);
        break;
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.LIKED:
        this.watchController.toggleLiked(videoId);
        break;
      case DOM_CONSTANTS.DATASET.BUTTON_TYPE.DELETE:
        this.watchController.deleteVideo(videoId);
        break;
    }

    this.watchController.updateCurrentView();
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView();
  }

  onClickWatchLaterViewButton() {
    videoViewIndex.setViewName(VIDEO_VIEW_NAME.WATCH_LATER);
    this.watchController.updateWatchLaterView();
  }

  onClickWatchedViewButton() {
    videoViewIndex.setViewName(VIDEO_VIEW_NAME.WATCHED);
    this.watchController.updateWatchedView();
  }

  onClickLikedViewButton() {
    videoViewIndex.setViewName(VIDEO_VIEW_NAME.LIKED);
    this.watchController.updateLikedView();
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView();
  }
}
