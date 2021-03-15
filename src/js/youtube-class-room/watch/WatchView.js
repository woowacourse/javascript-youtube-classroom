import { createSavedClipTemplate } from "../../templates/videoClipTemplate.js";

import { PALLET, EMPTY_IMG } from "../../utils/constants.js";
import elements from "../../utils/elements.js";
import {
  hideElement,
  showElement,
  removeBackgroundColor,
  addBackgroundColor,
  createImg,
} from "../../utils/dom.js";

export default class WatchView {
  removeAllButtonColor() {
    removeBackgroundColor(elements.$watchLaterViewButton, PALLET.CYAN_100);
    removeBackgroundColor(elements.$watchedViewButton, PALLET.CYAN_100);
    removeBackgroundColor(elements.$likedViewButton, PALLET.CYAN_100);
  }

  hideNotFoundImgs() {
    hideElement(elements.$notSaved);
    hideElement(elements.$notWatched);
    hideElement(elements.$noLiked);
  }

  markWatchLaterViewButton() {
    this.removeAllButtonColor();
    addBackgroundColor(elements.$watchLaterViewButton, PALLET.CYAN_100);
  }

  markWatchedViewButton() {
    this.removeAllButtonColor();
    addBackgroundColor(elements.$watchedViewButton, PALLET.CYAN_100);
  }

  markLikedViewButton() {
    this.removeAllButtonColor();
    addBackgroundColor(elements.$likedViewButton, PALLET.CYAN_100);
  }

  appendSavedVideoClips(items) {
    const fragment = document.createDocumentFragment();

    items.forEach((item) => fragment.append(createSavedClipTemplate(item)));

    return fragment;
  }

  showEmptyImg(imgSrc) {
    hideElement(elements.$savedVidoes);
    showElement(elements.$emptyImg);

    elements.$emptyImg.innerHTML = "";
    elements.$emptyImg.append(
      createImg(imgSrc, EMPTY_IMG.ALT.NO_VIDEOS, EMPTY_IMG.WIDTH.DEFAULT)
    );
  }

  updateSavedVideosView(selectedVideos) {
    hideElement(elements.$emptyImg);
    showElement(elements.$savedVidoes);

    elements.$savedVidoes.innerHTML = "";
    elements.$savedVidoes.append(this.appendSavedVideoClips(selectedVideos));
  }
}
