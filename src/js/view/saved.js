import { $, parseDOMFromString, toggleSelectorClass } from '../utils/util.js';
import { savedVideoTemplate } from '../templates/video-template.js';
import { SELECTOR } from '../constants/constant.js';
class SavedView {
  constructor() {
    this.$savedVideoWrapper = $(SELECTOR.SAVED_VIDEO_WRAPPER);
    this.$savedNotFound = $(SELECTOR.SAVED_NOT_FOUND);
  }

  // TODO : 개선해보기..
  renderSavedVideos(infos) {
    this.$savedVideoWrapper.innerHTML = ``;

    if (infos.length === 0) {
      toggleSelectorClass(this.$savedNotFound, CLASS.SHOW, true);
      return;
    }

    toggleSelectorClass(this.$savedNotFound, CLASS.SHOW, false);

    infos.forEach(info => {
      this.$savedVideoWrapper.innerHTML += savedVideoTemplate(info);
    });
  }

  appendSavedVideo(info) {
    if (this.$savedVideoWrapper.children.length === 0) {
      toggleSelectorClass(this.$savedNotFound, CLASS.SHOW, false);
    }

    this.$savedVideoWrapper.appendChild(
      parseDOMFromString(savedVideoTemplate(info))
    );
  }

  hideSelectedVideo(target) {
    this.$savedVideoWrapper.removeChild(target.closest(SELECTOR.CLIP));

    if (this.$savedVideoWrapper.children.length === 0) {
      toggleSelectorClass(this.$savedNotFound, CLASS.SHOW, true);
    }
  }
}

export default SavedView;
