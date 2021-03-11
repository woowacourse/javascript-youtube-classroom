import { $, parseDOMFromString, toggleSelectorClass } from '../utils/util.js';
import { savedVideoTemplate } from '../templates/video-template.js';
class SavedView {
  constructor() {
    this.$savedVideoWrapper = $('#saved-video-wrapper');
    this.$savedNotFound = $('#saved-not-found');
  }

  // TODO : 개선해보기..
  renderSavedVideos(infos) {
    this.$savedVideoWrapper.innerHTML = ``;

    if (infos.length === 0) {
      toggleSelectorClass(this.$savedNotFound, 'show', true);
      return;
    }

    toggleSelectorClass(this.$savedNotFound, 'show', false);

    infos.forEach(info => {
      this.$savedVideoWrapper.innerHTML += savedVideoTemplate(info);
    });
  }

  appendSavedVideo(info) {
    if (this.$savedVideoWrapper.children.length === 0) {
      toggleSelectorClass(this.$savedNotFound, 'show', false);
    }

    this.$savedVideoWrapper.appendChild(
      parseDOMFromString(savedVideoTemplate(info))
    );
  }

  hideSelectedVideo(target) {
    this.$savedVideoWrapper.removeChild(target.closest('.clip'));

    if (this.$savedVideoWrapper.children.length === 0) {
      toggleSelectorClass(this.$savedNotFound, 'show', true);
    }
  }
}

export default SavedView;
