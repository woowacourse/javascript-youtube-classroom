import { $, parseDOMFromString } from '../utils/util.js';
import { savedVideoTemplate } from '../templates/video-template.js';
class SavedView {
  constructor() {
    this.$savedVideoWrapper = $('#saved-video-wrapper');
  }

  toggleNotFoundSavedVideo(show) {
    $('#saved-not-found').classList.toggle('show', show);
  }

  // TODO : 개선해보기..
  renderSavedVideos(infos) {
    this.$savedVideoWrapper.innerHTML = ``;

    if (infos.length === 0) {
      this.toggleNotFoundSavedVideo(true);
      return;
    }

    this.toggleNotFoundSavedVideo(false);
    infos.forEach(info => {
      this.$savedVideoWrapper.innerHTML += savedVideoTemplate(info);
    });
  }

  appendSavedVideo(info) {
    if (this.$savedVideoWrapper.children.length === 0) {
      this.toggleNotFoundSavedVideo(false);
    }

    this.$savedVideoWrapper.appendChild(
      parseDOMFromString(savedVideoTemplate(info))
    );
  }

  hideSelectedVideo(target) {
    this.$savedVideoWrapper.removeChild(target.closest('.clip'));

    if (this.$savedVideoWrapper.children.length === 0) {
      this.toggleNotFoundSavedVideo(true);
    }
  }
}

export default SavedView;
