import { $, parseDOMFromString, toggleSelectorClass } from '../utils/util.js';
import { videoTemplate } from '../templates/video-template.js';
import { SELECTOR, CLASS } from '../constants/constant.js';
class SavedView {
  #$savedVideoWrapper;
  #$savedNotFound;

  constructor() {
    this.#$savedVideoWrapper = $(SELECTOR.SAVED_VIDEO_WRAPPER);
    this.#$savedNotFound = $(SELECTOR.SAVED_NOT_FOUND);
  }

  // TODO: 개선해보기..
  renderSavedVideos(infos) {
    this.#$savedVideoWrapper.innerHTML = ``;

    if (infos.length === 0) {
      toggleSelectorClass(this.#$savedNotFound, CLASS.SHOW, true);
      return;
    }

    toggleSelectorClass(this.#$savedNotFound, CLASS.SHOW, false);
    infos.forEach(info => {
      this.#$savedVideoWrapper.innerHTML += videoTemplate(info);
    });
  }

  appendSavedVideo(info) {
    if (this.#$savedVideoWrapper.children.length === 0) {
      toggleSelectorClass(this.#$savedNotFound, CLASS.SHOW, false);
    }

    this.#$savedVideoWrapper.appendChild(
      parseDOMFromString(videoTemplate(info))
    );
  }

  hideSelectedVideo(target) {
    this.#$savedVideoWrapper.removeChild(target.closest(SELECTOR.CLIP));

    if (this.#$savedVideoWrapper.children.length === 0) {
      toggleSelectorClass(this.#$savedNotFound, CLASS.SHOW, true);
    }
  }

  toggleNavButton(target) {
    [...target.parentNode.children].forEach(child =>
      child.classList.remove(CLASS.BG_CYAN)
    );
    target.classList.add(CLASS.BG_CYAN);
  }
}

export default SavedView;
