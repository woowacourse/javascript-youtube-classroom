import WatchController from "./WatchController.js";

import videos from "../state/videos.js";
import elements from "../utils/elements.js";

export default class WatchEventController {
  constructor() {
    this.watchController = new WatchController();
  }

  bindEvents() {
    window.addEventListener("load", this.onLoadApp.bind(this));
    elements.$watchLaterButton.addEventListener(
      "click",
      this.onClickWatchLaterButton.bind(this)
    );
    elements.$watchedButton.addEventListener(
      "click",
      this.onClickWatchedButton.bind(this)
    );
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveButton.bind(this)
    );
  }

  onLoadApp() {
    videos.initSavedVideos();
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchLaterButton() {
    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }

  onClickWatchedButton() {
    this.watchController.updateWatchedView(videos.getSavedVideos());
  }

  onClickSaveButton(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    this.watchController.updateWatchLaterView(videos.getSavedVideos());
  }
}
