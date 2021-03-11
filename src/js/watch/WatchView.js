import { hideElement, showElement } from "../utils/dom.js";
import elements from "../utils/elements.js";

export default class WatchView {
  showNotSavedImg() {
    this.hideAllSection();
    showElement(elements.$notSaved);
  }

  showNotWatchedImg() {
    this.hideAllSection();
    showElement(elements.$notWatched);
  }

  showWatchLaterVideos() {
    this.hideAllSection();
    showElement(elements.$watchLaterVideos);
  }

  showWatchedVideos() {
    this.hideAllSection();
    showElement(elements.$watchedVideos);
  }

  hideAllSection() {
    hideElement(elements.$notSaved);
    hideElement(elements.$notWatched);
    hideElement(elements.$watchLaterVideos);
    hideElement(elements.$watchedVideos);
  }
}
