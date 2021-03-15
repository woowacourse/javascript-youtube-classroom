import {
  $,
  $$,
  parseDOMFromString,
  toggleSelectorClass,
} from '../utils/util.js';
import { videoTemplate } from '../templates/video-template.js';
import { SELECTOR, CLASS } from '../constants/constant.js';
class SavedView {
  #$savedVideoWrapper;
  #$savedNotFound;

  constructor() {
    this.#$savedVideoWrapper = $(SELECTOR.SAVED_VIDEO_WRAPPER);
    this.#$savedNotFound = $(SELECTOR.SAVED_NOT_FOUND);
  }

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

  toggleNavButton(value) {
    $$('header nav button').forEach(button => {
      if (button.id === value) {
        toggleSelectorClass(button, CLASS.BG_CYAN, true);
        return;
      }

      toggleSelectorClass(button, CLASS.BG_CYAN, false);
    });
  }
}

export default SavedView;
