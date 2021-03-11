import { createSavedClipTemplate } from "../templates/videoClipTemplate.js";
import { PALLET } from "../utils/constants.js";
import {
  hideElement,
  showElement,
  removeBackgroundColor,
  addBackgroundColor,
} from "../utils/dom.js";
import elements from "../utils/elements.js";

export default class WatchView {
  markWatchLaterViewButton() {
    this.removeAllButtonColor();
    addBackgroundColor(elements.$watchLaterViewButton, PALLET.CYAN_100);
  }

  markWatchedViewButton() {
    this.removeAllButtonColor();
    addBackgroundColor(elements.$watchedViewButton, PALLET.CYAN_100);
  }

  showNotSavedImg() {
    this.hideAllSection();
    showElement(elements.$notSaved);
  }

  showNotWatchedImg() {
    this.hideAllSection();
    showElement(elements.$notWatched);
  }

  showWatchLaterVideos(watchLaterVideos) {
    this.hideAllSection();
    showElement(elements.$watchLaterVideos);
    elements.$watchLaterVideos.innerHTML = "";

    const fragment = document.createDocumentFragment();
    watchLaterVideos.forEach((video) =>
      fragment.append(createSavedClipTemplate(video))
    );
    elements.$watchLaterVideos.append(fragment);
  }

  showWatchedVideos(watchedVideos) {
    this.hideAllSection();
    showElement(elements.$watchedVideos);
    elements.$watchLaterVideos.innerHTML = "";

    const fragment = document.createDocumentFragment();
    watchedVideos.forEach((video) =>
      fragment.append(createSavedClipTemplate(video))
    );
    elements.$watchedVideos.append(fragment);
  }

  removeAllButtonColor() {
    removeBackgroundColor(elements.$watchLaterViewButton, PALLET.CYAN_100);
    removeBackgroundColor(elements.$watchedViewButton, PALLET.CYAN_100);
  }

  hideAllSection() {
    hideElement(elements.$notSaved);
    hideElement(elements.$notWatched);
    hideElement(elements.$watchLaterVideos);
    hideElement(elements.$watchedVideos);
  }
}
