import WatchController from "./WatchController.js";

import videos from "../state/videos.js";
import elements from "../utils/elements.js";
import { addBackgroundColor } from "../utils/dom.js";
import { PALLET } from "../utils/constants.js";

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
}
