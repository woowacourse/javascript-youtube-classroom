import WatchController from "./WatchController.js";

import videos from "../state/videos.js";
import elements from "../utils/elements.js";

export default class WatchEventController {
  constructor() {
    this.watchController = new WatchController();
  }

  bindEvents() {
    window.addEventListener("load", this.onLoadApp.bind(this));
    elements.$watchLaterViewButton.addEventListener(
      "click",
      this.onClickWatchLaterViewButton.bind(this)
    );
    elements.$watchedViewButton.addEventListener(
      "click",
      this.onClickWatchedViewButton.bind(this)
    );
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveButton.bind(this)
    );

    elements.$watchLaterVideos.addEventListener(
      "click",
      this.onClickWatchedButton.bind(this)
    );
    elements.$watchedVideos.addEventListener(
      "click",
      this.onClickClearWatchLogbutton.bind(this)
    );

    elements.$watchLaterVideos.addEventListener("click", (e) =>
      this.onClickDeleteButton(e, false)
    );
    elements.$watchedVideos.addEventListener("click", (e) =>
      this.onClickDeleteButton(e, true)
    );
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchLaterViewButton() {
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchedViewButton() {
    this.watchController.updateWatchedView(videos.getSavedVideos());
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchedButton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    this.watchController.watchVideo(videoId);
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickClearWatchLogbutton(e) {
    const videoId = e.target.dataset.watchedButton;
    if (!videoId) {
      return;
    }

    this.watchController.clearWatchedViedoLog(videoId);
    this.watchController.updateWatchedView(videos.getSavedVideos());
  }

  onClickDeleteButton(e, isWatched) {
    const videoId = e.target.dataset.deleteButton;
    if (!videoId) {
      return;
    }

    this.watchController.deleteVideo(videoId);
    if (isWatched) {
      this.watchController.updateWatchedView(videos.getSavedVideos());
    } else {
      this.watchController.updateWatchLaterView(videos.getSavedVideos());
    }
  }
}
