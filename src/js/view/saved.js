import { $, parseDOMFromString } from '../utils/util.js';
import {
  savedVideoTemplate,
  videoNotFoundTemplate,
} from '../templates/video-template.js';
class SavedView {
  constructor() {
    this.$savedVideoWrapper = $('#saved-video-wrapper');
  }

  renderNotFoundSavedVideo() {
    this.$savedVideoWrapper.innerHTML = videoNotFoundTemplate();
  }

  // TODO : 개선해보기..
  renderSavedVideos(infos) {
    this.resetSavedVideos();
    infos.forEach(info => {
      this.$savedVideoWrapper.innerHTML += savedVideoTemplate(info);
    });
  }

  appendSavedVideo(info) {
    if (this.$savedVideoWrapper.firstElementChild.id === 'saved-not-found') {
      this.resetSavedVideos();
    }

    this.$savedVideoWrapper.appendChild(
      parseDOMFromString(savedVideoTemplate(info))
    );
  }

  resetSavedVideos() {
    this.$savedVideoWrapper.innerHTML = ``;
  }

  hideSelectedVideo(target) {
    this.$savedVideoWrapper.removeChild(target.closest('.clip'));

    if (this.$savedVideoWrapper.children.length === 0) {
      this.$savedVideoWrapper.innerHTML = videoNotFoundTemplate();
    }
  }
}

export default SavedView;
